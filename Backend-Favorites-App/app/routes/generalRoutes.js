import express from "express";
import * as db from '../database/mongoDB.js'
const router = express.Router();

router.get('/', (req, res) => {
  //console.log("General call made")
  res.json({data: 'Connected to server'})
})

router.get('/dbtest', async (req, res) => {
  try {
    await db.connect()
    await db.close()
    res.sendStatus(200)
  } catch (e) {
    console.log('error connecting or closing database ', e)
    res.sendStatus(401)
  }
})

export default router