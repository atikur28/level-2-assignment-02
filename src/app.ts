import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { usersRoutes } from "./modules/users/users.routes";

const app = express();

//* Parser
app.use(express.json());

//* Initializing database
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

//* Users Crud
app.use("/api/v1/users", usersRoutes);

//* Auth Routes
app.use("/api/v1/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found!",
    path: req.path,
  });
});

export default app;
