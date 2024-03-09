import app from './app.js'
import * as db from './app/database/mongoDB.js'

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
  //db.connect();
});

process.on('SIGINT', async () => {
  console.log('Signal interrupted')
  await db.forceClose()
})
process.on('SIGTERM', async () => {
  console.log('Signal terminated')
  await db.forceClose()
})