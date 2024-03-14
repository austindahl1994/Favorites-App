//Everything for Authorizations, login, register, logout, password recovery, token refresh
import jwt from "jsonwebtoken";
import { createUser } from "../services/userService.js";
//should not need following since is imported into app.js
// import dotenv from "dotenv";
// dotenv.config();

/**
 *
 * @param {object} req - Request object from Express.js containing HTTP req object
 * Expects to have a body property with a username field
 * @param {Object} res - Response object from Express.js
 * Expects to send back generated access token
 */
export const login = (req, res) => {
  const username = req.body.username;
  const user = { user: username };
  console.log(`username sent was: ${user.user}`);
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
};

export const logout = (req, res) => {};

export const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    //console.log(user);
    res.status(200).json({ Message: "Sucessfully created user in database" });
  } catch (error) {
    console.log(`Caught error in registering, error: ${error}`);
    res.status(500).send(error.message);
  }
};

export const refreshToken = (req, res) => {};
