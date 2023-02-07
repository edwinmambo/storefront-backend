import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const authoriseToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token. Error ${err}`);
    next(err);
  }
};

export default authoriseToken;
