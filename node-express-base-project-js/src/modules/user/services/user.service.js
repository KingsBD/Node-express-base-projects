import { UserDao } from "../dao/user.dao";
import {
  traceError,
  traceBegin,
  traceEnd,
  traceFilter,
  getLogId,
} from "../../../utils/logger";

class UserService {
  constructor() {
    this.userDao = new UserDao();
  }

  async searchUser(filter) {
    const logId = getLogId();
    try {
      traceBegin("searchUser", logId);
      traceFilter("searchUser", filter, logId);
      const result = await this.userDao.searchUser(filter);
      traceEnd("searchUser", logId);
      return result;
    } catch (error) {
      traceError("searchUser", error, logId);
      throw error;
    }
  }

  async getUser(id) {
    const logId = getLogId();
    try {
      traceBegin("getUser", logId);
      traceFilter("getUser", id, logId);
      const result = await this.userDao.getUser(id);
      traceEnd("getUser", logId);
      return result;
    } catch (error) {
      traceError("getUser", error, logId);
      throw error;
    }
  }

  async getUsers() {
    const logId = getLogId();
    try {
      traceBegin("getUsers", logId);
      const result = await this.userDao.getUsers();
      traceEnd("getUsers", logId);
      return result;
    } catch (error) {
      traceError("getUsers", error, logId);
      throw error;
    }
  }

  async createUser(newUser) {
    const logId = getLogId();
    try {
      traceBegin("createUser", logId);
      traceFilter("createUser", newUser, logId);
      const obUser = await this.userDao.createUser(newUser);
      traceEnd("createUser", logId);
      return obUser;
    } catch (error) {
      traceError("createUser", error, logId);
      throw error;
    }
  }

  async updateUser(obUser, id) {
    const logId = getLogId();
    try {
      traceBegin("updateUser", logId);
      traceFilter("updateUser", obUser, logId);
      const user = await this.userDao.updateUser(obUser, id);
      traceEnd("updateUser", logId);
      return user;
    } catch (error) {
      traceError("updateUser", error, logId);
      throw error;
    }
  }

  async deleteUser(id) {
    const logId = getLogId();
    try {
      traceBegin("deleteUser", logId);
      traceFilter("deleteUser", id, logId);
      await this.userDao.deleteUser(id);
      traceEnd("deleteUser", logId);
    } catch (error) {
      traceError("deleteUser", error, logId);
      throw error;
    }
  }
}

export { UserService };

export default new UserService();
