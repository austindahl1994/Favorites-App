import User from "../models/userModel.js";

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export { createUser };
