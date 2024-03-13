import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { User } from "../../app/models/userModel.js";
import { createUser } from "../../app/services/userService.js";
let mongoServer;

const userData = {
  username: "johnnyboy",
  email: "jb@gmail.com",
  password: "noneyabusiness",
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("User Model Test", () => {
  test("create and save user successfully without fn", async () => {
    const createdUser = new User(userData);
    const savedUser = await createdUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.createdAt).toBeDefined();

    const deletedUser = await User.findOneAndDelete({ username: "johnnyboy" });

    const userAfterDeletion = await User.findOne({ username: "johnnyboy" });
    expect(userAfterDeletion).toBeNull();
  });
});

describe("User Creation Service Test", () => {
  test("Use createUser function properly using createUser fn", async () => {
    await createUser(userData);

    const createdUser = await User.findOne({ username: "johnnyboy" });
    expect(createdUser).not.toBeNull();
    expect(createdUser.username).toBe(userData.username);
    expect(createdUser.email).toBe(userData.email);

    const deletedUser = await User.findOneAndDelete({ username: "johnnyboy" });

    const userAfterDeletion = await User.findOne({ username: "johnnyboy" });
    expect(userAfterDeletion).toBeNull();
  });
});
