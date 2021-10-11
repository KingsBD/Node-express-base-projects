import UserSchema from '../model/user.schema';

class UserDao {
  userSchema: any;

  constructor() {
    this.userSchema = UserSchema;
  }

  validEmail = async (user: { _id?: any; email?: any }) => {
    const { email } = user;
    const dbUser = await this.searchUser({ email });
    if (
      // eslint-disable-next-line no-underscore-dangle
      (user?._id && dbUser._id.toString() !== user._id.toString()) ||
      // eslint-disable-next-line no-underscore-dangle
      (!user?._id && dbUser)
    )
      throw new Error('There is already a registered user with this email.');
  };

  searchUser = (filter: any) => this.userSchema.findOne(filter);

  getUser = (id: any) => this.userSchema.findOne({ _id: id });

  getUsers = () => this.userSchema.find();

  createUser = async (newUser: any) => {
    await this.validEmail(newUser);
    const obUser = new UserSchema(newUser);
    await obUser.save();
    return obUser;
  };

  updateUser = async (
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
  ) => {
    const user = await this.getUser(id);
    if (!user) throw new Error('There is not a registered user with this id.');
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
  };

  deleteUser = (id: any) => this.userSchema.deleteOne({ _id: id });
}

export { UserDao };

export default new UserDao();
