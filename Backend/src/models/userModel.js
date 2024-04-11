import { Schema, model } from "mongoose";
// import { hash } from 'bcrypt';

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },

  username: { type: String, required: true },
  createdAt: { type: Date, required: true }
});

const User = model("User", userSchema);

export default User;
