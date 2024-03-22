import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const generateAccessToken = (user) => {
  try {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
  } catch (error) {
    return error;
  }
};

export const generateRefreshToken = (user) => {
  try {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30s",
    });
  } catch (error) {
    return error;
  }
};
