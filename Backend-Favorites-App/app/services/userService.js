import { User } from "../models/userModel.js";

const createUser = async (data) => {
  const createdUser = new User(data);
  await createdUser.save();
};

export { createUser };
