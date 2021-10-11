import { UserDao } from '../dao/user.dao';
import ServiceError from '../../../utils/exeptions/services-error.exeption';
import * as UserExceptions from '../exceptions/user.exceptions.json';

class UserService {
  userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  async searchUser(filter: any) {
    try {
      const result = await this.userDao.searchUser(filter);
      return result;
    } catch (error: any) {
      throw new ServiceError(
        UserExceptions['7001'].code,
        UserExceptions['7001'].error,
        [error?.message],
      );
    }
  }

  async getUser(id: string) {
    try {
      const result = await this.userDao.getUser(id);
      return result;
    } catch (error: any) {
      throw new ServiceError(
        UserExceptions['7001'].code,
        UserExceptions['7001'].error,
        [error?.message],
      );
    }
  }

  async getUsers() {
    try {
      const result = await this.userDao.getUsers();
      return result;
    } catch (error: any) {
      throw new ServiceError(
        UserExceptions['7000'].code,
        UserExceptions['7000'].error,
        [error?.message],
      );
    }
  }

  async createUser(newUser: string) {
    try {
      const obUser = await this.userDao.createUser(newUser);
      return obUser;
    } catch (error: any) {
      throw new ServiceError(
        UserExceptions['7002'].code,
        UserExceptions['7002'].error,
        [error?.message],
      );
    }
  }

  async updateUser(
    obUser: {
      firstName: string;
      middleName: string;
      lastName: string;
      email: string;
      secundaryEmail: string;
      phoneNumber: string;
      secundaryPhoneNumber: string;
      homeAddress: string;
      city: string;
      password: string;
    },
    id: string,
  ) {
    try {
      const user = await this.userDao.updateUser(obUser, id);
      return user;
    } catch (error: any) {
      throw new ServiceError(
        UserExceptions['7003'].code,
        UserExceptions['7003'].error,
        [error?.message],
      );
    }
  }

  async deleteUser(id: string) {
    try {
      await this.userDao.deleteUser(id);
    } catch (error: any) {
      throw new ServiceError(
        UserExceptions['7004'].code,
        UserExceptions['7004'].error,
        [error?.message],
      );
    }
  }
}

export { UserService };

export default new UserService();
