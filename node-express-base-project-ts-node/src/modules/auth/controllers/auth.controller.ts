import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import {
  traceError,
  traceBegin,
  traceEnd,
  traceFilter,
  getLogId,
} from '../../../utils/logger';

export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response) => {
    const logId = getLogId();
    try {
      traceBegin('login', logId);
      traceFilter('login', req.body, logId);
      const result = await this.authService.login(
        req.body.username,
        req.body.password,
      );
      traceEnd('login', logId);
      res.status(200).json(result);
    } catch (error: any) {
      traceError('login', error, logId);
      res
        .status(500)
        .json({ error: error?.message || 'Internal server error' });
    }
  };
}

export default new AuthController();
