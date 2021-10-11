import { Request, Response, NextFunction } from 'express';

export default (fields: string[], method: string) =>
  // eslint-disable-next-line consistent-return
  (req: Request, res: Response, next: NextFunction) => {
    let parameters;
    switch (method) {
      case 'GET':
        parameters = req.query;
        break;

      case 'POST':
      case 'DELETE':
      case 'PUT':
        parameters = req.body;
        break;

      default:
        parameters = ['method'];
        break;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const field of fields) {
      if (!parameters[field]) {
        // Field isn't present, end request
        return res.status(400).json({
          message: `${field} is missing`,
        });
      }
    }

    next();
  };
