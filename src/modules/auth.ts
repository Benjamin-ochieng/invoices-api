import { Magic } from "@magic-sdk/admin";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";
import config from "../config";
import * as errors from "./errors";
import { tryToCatch } from "./utils";

function setCookie(res, token) {
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: config.secrets.refreshExp,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
}

function verifyAccessToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
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
  const magic = new Magic(process.env.MAGIC_SECRET_KEY);
  const didToken = req.headers.authorization.substr(7);
  await magic.token.validate(didToken);
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
    const refreshToken = jwt.sign(
      { id: metadata.issuer },
      config.secrets.jwtRefresh,
      { expiresIn: config.secrets.refreshExp }
    );

    const accessToken = jwt.sign(
      { id: metadata.issuer },
      config.secrets.jwtAccess,
      { expiresIn: config.secrets.accessExp }
    );
    setCookie(res, refreshToken);
    res.status(200).json({
      token: accessToken,
      done: true,
    });
  }
}

export function refreshTokens(req, res, next) {
  const refreshToken = req.cookies.token;
  if (!refreshToken) return next(new errors.UnauthorizedError());
  jwt.verify(refreshToken, config.secrets.jwtRefresh, (err, user) => {
    if (err) return next(new errors.UnauthorizedError());
    const accessToken = jwt.sign(
      { id: user.id },
      config.secrets.jwtAccess,
      { expiresIn: config.secrets.accessExp }
    );
    const newRefreshToken = jwt.sign(
      { id: user.id },
      config.secrets.jwtRefresh,
      { expiresIn: config.secrets.refreshExp }
    );
    setCookie(res, newRefreshToken);
    res.status(200).json({
      token: accessToken,
      done: true,
    });
  });
}

// export const comparePassword = (password, hash) =>
//   bcrypt.compare(password, hash);

// export const hashPassword = (password) => bcrypt.hash(password, 5);

// export const createJWT = (user) => {
//   const token = jwt.sign(
//     { id: user.id, name: user.userName },
//     process.env.JWT_SECRET
//   );
//   return token;
// };

// export const verifyToken = (token) =>
//   new Promise((resolve, reject) => {
//     jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(payload);
//     });
//   });

// export const signup = async (req, res, next) => {
//   try {
//     const hash = await hashPassword(req.body.password);
//     const newUser = await prisma.user
//       .create({
//         data: {
//           userEmail: req.body.userEmail,
//           userName: req.body.userName,
//           password: hash,
//         },
//       })
//       .catch((err) => {
//         if (err.code === "P2002") {
//           throw new errors.ConflictError("userName");
//         } else {
//           next(err);
//         }
//       });
//     const token = createJWT(newUser);
//     res.json({ token });
//   } catch (err) {
//     next(err);
//   }
// };

// export const signin = async (req, res, next) => {
//   const [err, user] = await tryToCatch(prisma.user.findUnique, {
//     where: { userName: req.body.userName },
//   });
//   if (!user) return next(new errors.UnauthorizedError());

//   const [err2, isValidUser] = await tryToCatch(
//     comparePassword,
//     req.body.password,
//     user.password
//   );
//   if (!isValidUser) return next(new errors.UnauthorizedError());

//   const token = createJWT(user);
//   res.json({ token });
// };

// export const protect = async (req, res, next) => {
//   const bearer = req.headers.authorization;
//   if (!bearer) {
//     return res.status(401).json({ error: "Unauthorized" }).end();
//   }
//   const [, token] = bearer.split(" ");
//   if (!bearer) {
//     return res.status(401).json({ error: "Unauthorized" }).end();
//   }
//   try {
//     const user = await verifyToken(token);
//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Unauthorized" }).end();
//   }
// };

// export const resetPassword = async (req, res, next) => {
//   try {
//     const hash = await hashPassword(req.body.password);
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: req.user.id,
//       },
//       data: {
//         password: hash,
//       },
//       select: {
//         userName: true,
//         updatedAt: true,
//       },
//     });
//     res.json({ data: updatedUser });
//   } catch (err) {
//     next(err);
//   }
// };
