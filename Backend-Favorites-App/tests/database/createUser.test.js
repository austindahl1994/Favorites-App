import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";
import { User } from "../../app/models/userModel.js";
dotenv.config();

beforeAll(async () => {
  const testDB = process.env.MONGO_URI + "TestDB";
  await mongoose.connect(testDB);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("User Model Test", () => {
  test("create and save user successfully", async () => {
    const userData = {
      username: "johnnyboy",
      email: "jb@gmail.com",
      password: "noneyabusiness",
    };
    const createdUser = new User(userData);
    const savedUser = await createdUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.createdAt).toBeDefined();
  });
});
