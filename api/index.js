import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import mongoose from "mongoose";

const app = express();

const Db = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
Db();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is runnin at PORT : ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.messgae || "Internal server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
