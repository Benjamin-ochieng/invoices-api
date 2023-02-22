import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";


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
     const newUser = await prisma.user.create({
       data: {
         userName: req.body.userName,
         password: hash,
       },
     });
     const token = createJWT(newUser);
     res.json({ token });
   } catch (err) {
     err.type = "input";
     next(err);
   }
 };

 export const signin = async (req, res) => {
   const user = await prisma.user.findUnique({
     where: {
       userName: req.body.userName,
     },
   });

   let invalid = { message: "Incorrect email password combination" };

   const isValidUser = await comparePassword(req.body.password, user.password);
   if (!isValidUser) {
     res.status(401).send(invalid);
   } else {
     const token = createJWT(user);
     res.json({ token });
   }
 }; 

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).end();
  }
  const [, token] = bearer.split(" ");
  if (!bearer) {
    return res.status(401).end();
  }
  try {
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).end();
  }
};
