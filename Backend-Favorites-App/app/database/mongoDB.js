import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("MONGO_URI env value is null or not set");
  process.exit(1);
}

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected!");
  } catch (error) {
    console.error(`Error connecting to MongoDB Database ${error}`);
    process.exit(1);
  }
};

const close = async () => {
  console.log("MongoDB closing");
  try {
    await mongoose.connection.close();
    console.log("Successfully closed database.");
  } catch (error) {
    console.error("There was an error closing the database: ", error);
  }
};

const forceClose = async () => {
  console.log("MongoDB closing");
  try {
    await mongoose.connection.close();
    console.log("Successfully closed database, closing server.");
  } catch (error) {
    console.error("There was an error closing the server: ", error);
  } finally {
    process.exit();
  }
};

export { connect, close, forceClose };
