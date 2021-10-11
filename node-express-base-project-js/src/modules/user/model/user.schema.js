import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  secundaryEmail: String,
  phoneNumber: String,
  secundaryPhoneNumber: String,
  homeAddress: String,
  city: String,
  password: String,
});

export default mongoose.model("user", userSchema);
