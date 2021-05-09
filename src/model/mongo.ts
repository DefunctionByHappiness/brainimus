import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const env = process.env;

const url = `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DATABASE}?authSource=admin`;
mongoose.connect(url, { auth: { authdb: "admin" }, useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});

export { db as connection, mongoose };
