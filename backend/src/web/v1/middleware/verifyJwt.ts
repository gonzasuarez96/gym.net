// Verify JWT middleware with JWL library
// ! NOT FULLY IMPLEMENTED
import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { config } from "./../../../config";

export const verifyJwt = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid access token.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};