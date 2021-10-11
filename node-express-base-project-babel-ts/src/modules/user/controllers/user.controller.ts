import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  searchUser = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.searchUser(req.query?.filter);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getUser(req.params.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getUsers();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const obUser = await this.userService.createUser(req.body);
      res.status(200).json(obUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id, ...userData } = req.body;
      const user = await this.userService.updateUser(userData, id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(200).json({ meesage: 'SUCESS' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new UserController();
