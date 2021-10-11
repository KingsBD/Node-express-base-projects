import { UserService } from '../../user';
import { generateToken } from '../../../utils/token';
import {
  traceError,
  traceBegin,
  traceEnd,
  traceFilter,
  getLogId,
} from '../../../utils/logger';

class AuthService {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(username: string, password: string) {
    const logId = getLogId();
    const filter = { email: username, password };
    try {
      traceBegin('login', logId);
      traceFilter('login', filter, logId);
      const result = await this.userService.searchUser(filter);
      if (!result) throw new Error('Authentication failed');
      const user = result.toObject();
      user.token = generateToken();
      traceEnd('login', logId);
      return user;
    } catch (error) {
      traceError('login', error, logId);
      throw error;
    }
  }
}

export { AuthService };

export default new AuthService();
