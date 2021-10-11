import UserSchema from "../model/user.schema";

class UserDao {
  constructor() {
    this.userSchema = UserSchema;
  }

  validEmail = async (user) => {
    const { email } = user;
    const dbUser = await this.searchUser({ email });
    if ((user?._id && dbUser._id.toString() !== user._id.toString()) || (!user?._id && dbUser))
      throw new Error("There is already a registered user with this email.");
  };

  searchUser = (filter) => {
    return this.userSchema.findOne(filter);
  };

  getUser = (id) => {
    return this.userSchema.findOne({ _id: id });
  };

  getUsers = () => {
    return this.userSchema.find();
  };

  createUser = async (newUser) => {
    try {
      await this.validEmail(newUser);
      const obUser = new UserSchema(newUser);
      await obUser.save();
      return obUser;
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (obUser, id) => {
    try {
      const user = await this.getUser(id);
      if (!user)
        throw new Error("There is not a registered user with this id.");
      user.firstName = obUser.firstName;
      user.middleName = obUser.middleName;
      user.lastName = obUser.lastName;
      user.email = obUser.email;
      user.secundaryEmail = obUser.secundaryEmail;
      user.phoneNumber = obUser.phoneNumber;
      user.secundaryPhoneNumber = obUser.secundaryPhoneNumber;
      user.homeAddress = obUser.homeAddress;
      user.city = obUser.city;
      user.password = obUser.password;
      await this.validEmail(user);
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  };

  deleteUser = (id) => {
    return this.userSchema.deleteOne({ _id: id });
  };
}

export { UserDao };

export default new UserDao();
