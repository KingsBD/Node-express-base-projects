import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import {
  traceError,
  traceBegin,
  traceEnd,
  traceFilter,
  getLogId,
} from '../../../utils/logger';

export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  searchUser = async (req: Request, res: Response) => {
    const logId = getLogId();
    try {
      traceBegin('searchUser', logId);
      traceFilter('searchUser', req.query, logId);
      const result = await this.userService.searchUser(req.query?.filter);
      traceEnd('searchUser', logId);
      res.status(200).json(result);
    } catch (error: any) {
      traceError('searchUser', error, logId);
      res.status(500).json({ error: error.message });
    }
  };

  getUser = async (req: Request, res: Response) => {
    const logId = getLogId();
    try {
      traceBegin('getUser', logId);
      traceFilter('getUser', req.params, logId);
      const result = await this.userService.getUser(req.params.id);
      traceEnd('getUser', logId);
      res.status(200).json(result);
    } catch (error: any) {
      traceError('getUser', error, logId);
      res.status(500).json({ error: error.message });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    const logId = getLogId();
    try {
      traceBegin('getUsers', logId);
      const result = await this.userService.getUsers();
      traceEnd('getUsers', logId);
      res.status(200).json(result);
    } catch (error: any) {
      traceError('getUsers', error, logId);
      res.status(500).json({ error: error.message });
    }
  };

  createUser = async (req: Request, res: Response) => {
    const logId = getLogId();
    try {
      traceBegin('createUser', logId);
      traceFilter('createUser', req.body, logId);
      const obUser = await this.userService.createUser(req.body);
      traceEnd('createUser', logId);
      res.status(200).json(obUser);
    } catch (error: any) {
      traceError('createUser', error, logId);
      res.status(500).json({ error: error.message });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const logId = getLogId();
    try {
      traceBegin('updateUser', logId);
      traceFilter('updateUser', req.body, logId);
      const { id, ...userData } = req.body;
      const user = await this.userService.updateUser(userData, id);
      traceEnd('updateUser', logId);
      res.status(200).json(user);
    } catch (error: any) {
      traceError('updateUser', error, logId);
      res.status(500).json({ error: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const logId = getLogId();
    try {
      traceBegin('deleteUser', logId);
      traceFilter('deleteUser', req.params, logId);
      await this.userService.deleteUser(req.params.id);
      traceEnd('deleteUser', logId);
      res.status(200).json({ meesage: 'SUCESS' });
    } catch (error: any) {
      traceError('deleteUser', error, logId);
      res.status(500).json({ error: error.message });
    }
  };
}

export default new UserController();
