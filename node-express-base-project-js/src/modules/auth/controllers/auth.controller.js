import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  login = async (req, res) => {
    try {
      const result = await this.authService.login(
        req.body.username,
        req.body.password
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new AuthController();
