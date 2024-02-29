//This is just a test for db later
const posts = [
  { username: "Austin", title: "post 1" },
  { username: "Tyler", title: "post 2" }
];

export const getPosts = (req, res) => {
  console.log('connected to homepage');
  const info = posts.filter((post) => {
    return post.username === req.user.user
  })
  res.json({data: info[0].username})
};
