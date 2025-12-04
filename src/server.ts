import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
