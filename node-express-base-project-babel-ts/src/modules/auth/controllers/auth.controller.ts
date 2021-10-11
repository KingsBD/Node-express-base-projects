import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(
        req.body.username,
        req.body.password,
      );
      res.status(200).json(result);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error?.message || 'Internal server error' });
    }
  };
}

export default new AuthController();
