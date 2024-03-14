import { User } from "../../app/models/userModel.js";
import { userData } from "../utils/mockData.js";

describe("User model test", () => {
  test("Should create a valid user based on model", async () => {
    const createdUser = new User(userData);
    await expect(createdUser.validate()).resolves.toBeUndefined();
    expect(createdUser).toHaveProperty("createdAt");
    expect(createdUser.username).toBe("johnnyboy");
  });
});
