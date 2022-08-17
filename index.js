import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dahnw2e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT} port`);
});
