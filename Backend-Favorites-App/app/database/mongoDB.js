import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URI env value is null or not set");
  process.exit(1);
}
const client = new MongoClient(uri);

const connect = async () => {
  try {
    await client.connect();
    console.log("Database connected!");
  } catch (error) {
    console.log(`Error connecting to MongoDB Database ${error}`);
  }
};

const close = async () => {
  console.log("MongoDB closing");
  try {
    await client.close();
    console.log("Successfully closed database.");
  } catch (e) {
    console.log("There was an error closing the server: ", e);
  }
};

const forceClose = async () => {
  console.log("MongoDB closing");
  try {
    await client.close();
    console.log("Successfully closed database, closing server.");
  } catch (e) {
    console.log("There was an error closing the server: ", e);
  } finally {
    process.exit();
  }
};

export { connect, close, forceClose };
