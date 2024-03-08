//This is just a test for db later
import { generateAccessToken } from "../middleware/authMiddleware";
const posts = [
  { username: "Austin", title: "post 1" },
  { username: "Tyler", title: "post 2" }
];

let refreshTokens = []

export const getPosts = (req, res) => {
  console.log('connected to homepage');
  const info = posts.filter((post) => {
    return post.username === req.user.user
  })
  res.json({data: info[0].username})
};

export const getToken = (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({user: user.username})
    res.json({accessToken: accessToken})
  })
}

export const deleteToken = (req, res) => {
  resfreshTokens = resfreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
}