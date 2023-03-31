import { Magic } from "@magic-sdk/admin";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import prisma from "../db";
import config from "../config";
import * as errors from "./errors";
import { tryToCatch } from "./utils";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

function setCookie(res, token) {
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: config.jwt.refreshExp,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
}

function removeCookie(res) {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
}

function verifyAccessToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(payload);
    });
  });
}

export async function protectRoute(req, res, next) {
  const bearer = req.headers.authorization;
  if (!bearer) return next(new errors.UnauthorizedError());
  const [, token] = bearer.split(" ");
  if (!token) return next(new errors.UnauthorizedError());
  const [err, user] = await tryToCatch(verifyAccessToken, token);
  if (err && err.name === "TokenExpiredError") {
    return next(new errors.TokenRevocationError());
  } else if (err && err.name === "JsonWebTokenError") {
    return next(new errors.UnauthorizedError());
  }
  req.user = user;
  next();
}

export async function login(req, res, next) {
  const didToken = req.headers.authorization.substr(7);
  const [didTokenError, _] = await tryToCatch(magic.token.validate, didToken);
  if (didTokenError) return next(new errors.UnauthorizedError());
  const metadata = await magic.users.getMetadataByToken(didToken);
  const [err, user] = await tryToCatch(prisma.user.findUnique, {
    where: { userEmail: metadata.email },
  });
  if (!user) {
    const [err, user] = await tryToCatch(prisma.user.create, {
      data: {
        userEmail: metadata.email,
        id: metadata.issuer,
      },
    });
  }

  const refreshToken = jwt.sign(
    { id: metadata.issuer },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: config.jwt.refreshExp }
  );

  const accessToken = jwt.sign(
    { id: metadata.issuer },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: config.jwt.accessExp }
  );
  setCookie(res, refreshToken);

  res.status(200).json({
    ...user,
    token: accessToken,
    done: true,
  });
}

export function refreshTokens(req, res, next) {
  const refreshToken = req.cookies.token;
  if (!refreshToken) return next(new errors.UnauthorizedError());
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return next(new errors.UnauthorizedError());
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: config.jwt.accessExp,
    });
    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: config.jwt.refreshExp }
    );
    setCookie(res, newRefreshToken);
    res.status(200).json({
      token: accessToken,
      done: true,
    });
  });
}

export async function logout(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(200).json({ done: true });
  const [err, user] = await tryToCatch(verifyAccessToken, token);
  if (err) return res.status(200).json({ done: true });
  await magic.users.logoutByIssuer(user.id);
  removeCookie(res);
  res.status(200).json({ done: true });
}
