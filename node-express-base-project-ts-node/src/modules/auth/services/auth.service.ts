import { UserService } from '../../user';
import { generateToken } from '../../../utils/token';

class AuthService {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(username: string, password: string) {
    const filter = { email: username, password };
    const result = await this.userService.searchUser(filter);
    if (!result) throw new Error('Authentication failed');
    const user = result.toObject();
    user.token = generateToken();
    return user;
  }
}

export { AuthService };

export default new AuthService();
