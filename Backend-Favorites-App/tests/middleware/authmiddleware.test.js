import { userData } from "../utils/mockData.js";
import { req, res } from "../utils/mockReqRes.js";
import {
  authenticateToken,
  generateAccessToken,
  generateRefreshToken,
} from "../../app/middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
  sign: jest.fn(),
}));

beforeAll(() => {
  process.env.ACCESS_TOKEN_SECRET = "tokenSecret";
  process.env.REFRESH_TOKEN_SECRET = "refreshSecrect";
});

beforeEach(() => {
  next = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Athenticate token", () => {
  test("Success - calls next if valid token", () => {
    const user = userData;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    req.headers["authorization"] = `Bearer ${token}`;
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, user);
    });

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user).toEqual(user);
  });

  test("Token missing - returns 401", () => {
    req.headers["authorization"] = null;
    authenticateToken(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("Token invalid - returns 403", () => {
    const token = "invalid_token";
    req.headers["authorization"] = `Bearer ${token}`;
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"));
    });

    authenticateToken(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("Generate token", () => {
  test("Success - generates token", () => {
    const token = "generated token";
    jwt.sign.mockReturnValue(token);

    const result = generateAccessToken(userData);

    expect(jwt.sign).toHaveBeenCalledWith(
      userData,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    expect(result).toBe(token);
  });

  test("Failure - returns an error", () => {
    const err = new Error("Token generation failed");
    jwt.sign.mockImplementation(() => {
      throw err;
    });

    const result = generateAccessToken(userData);

    expect(jwt.sign).toHaveBeenCalledWith(
      userData,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10s",
      }
    );
    expect(result).toEqual(err);
  });
});

describe("Generate refresh token", () => {
  test("Success - generates refresh token", () => {
    const token = "generated token";
    jwt.sign.mockReturnValue(token);

    const result = generateRefreshToken(userData);

    expect(jwt.sign).toHaveBeenCalledWith(
      userData,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    expect(result).toBe(token);
  });

  test("Failure - returns an error", () => {
    const err = new Error("Token refresh generation failed");
    jwt.sign.mockImplementation(() => {
      throw err;
    });

    const result = generateRefreshToken(userData);

    expect(jwt.sign).toHaveBeenCalledWith(
      userData,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    expect(result).toEqual(err);
  });
});
