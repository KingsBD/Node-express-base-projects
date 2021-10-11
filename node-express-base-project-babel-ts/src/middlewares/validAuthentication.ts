import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';

// eslint-disable-next-line consistent-return
export default () => (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization
      ? req?.headers?.authorization.split(' ')[1]
      : '';
    verifyToken(token);
    next();
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
