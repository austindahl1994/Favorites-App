import { register } from "../../app/controllers/authController.js";
import { login } from "../../app/controllers/authController.js";
import { createUser } from "../../app/services/userService.js";
import { userData } from "../utils/mockData.js";
import jwt from "jsonwebtoken";

const mockUserName = "testUser";

//Mock add user to database
jest.mock("../../app/services/userService.js", () => ({
  createUser: jest.fn().mockImplementation(async (data) => {
    return { id: "mockID", ...data, createdAt: new Date().toISOString() };
  }),
}));

//Mock jwt.sign
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

//Mock req and response information
const req = {
  body: userData,
};

const res = {
  json: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};

beforeAll(() => {
  process.env.ACCESS_TOKEN_SECRET = "testSecret";
});

describe("Authorization Tests", () => {
  test("Login - User logs in and creates JWT", async () => {
    const mockAccessToken = "token123";
    jwt.sign.mockImplementation(() => mockAccessToken);
    login(req, res);
    expect(jwt.sign).toHaveBeenCalledWith(
      { user: userData.username },
      process.env.ACCESS_TOKEN_SECRET
    );
    expect(res.json).toHaveBeenCalledWith({ accessToken: mockAccessToken });
  });

  test("Register - adds user to db and sends 200 status back", async () => {
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      Message: "Sucessfully created user in database",
    });
  });

  test("Register - should fail, send status 500 back and error message", async () => {
    const mockError = new Error("Test error");
    createUser.mockRejectedValue(mockError);
    await register(req, res);
    //res.status(500).send("Test error");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(expect.any(String));
  });
});
