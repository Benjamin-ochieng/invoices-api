import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";
import * as errors from "./errors";
import { tryToCatch } from "./utils";

export const comparePassword = (password, hash) =>
  bcrypt.compare(password, hash);

export const hashPassword = (password) => bcrypt.hash(password, 5);

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, name: user.userName },
    process.env.JWT_SECRET
  );
  return token;
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(payload);
    });
  });

export const signup = async (req, res, next) => {
  try {
    const hash = await hashPassword(req.body.password);
    const newUser = await prisma.user
      .create({
        data: {
          userName: req.body.userName,
          password: hash,
        },
      })
      .catch((err) => {
        if (err.code === "P2002") {
          throw new errors.ConflictError("userName");
        } else {
          next(err);
        }
      });
    const token = createJWT(newUser);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const [err, user] = await tryToCatch(prisma.user.findUnique, {
    where: { userName: req.body.userName },
  });
  if (!user) return next(new errors.UnauthorizedError());

  const [err2, isValidUser] = await tryToCatch(
    comparePassword,
    req.body.password,
    user.password
  );
  if (!isValidUser) return next(new errors.UnauthorizedError());

  const token = createJWT(user);
  res.json({ token });
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ error: "Unauthorized" }).end();
  }
  const [, token] = bearer.split(" ");
  if (!bearer) {
    return res.status(401).json({ error: "Unauthorized" }).end();
  }
  try {
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" }).end();
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const hash = await hashPassword(req.body.password);
    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hash,
      },
      select: {
        userName: true,
        updatedAt: true,
      },
    });
    res.json({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};
