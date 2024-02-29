import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const login = (req, res) => {
  const username = req.body.username;
  const user = { user: username };
  console.log(`username sent was: ${user.user}`)
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken});
};

export const register = (req, res) => {
  // Registration logic here
};
