import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { User } from "../../app/models/userModel.js";
import { createUser } from "../../app/services/userService.js";
import { userData } from "../utils/mockData.js";
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("MongoDB Connect", () => {
  test("Create and save user successfully using model", async () => {
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
