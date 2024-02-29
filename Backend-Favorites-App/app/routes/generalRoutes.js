import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
  console.log("General call made")
  res.json({data: 'Connected to server'})
})

export default router