import { Router } from "express";
import auth from "../../middleware/auth";
import { userControllers } from "./users.controllers";

const router = Router();

router.get("/", auth("admin"), userControllers.getUsers);

router.get("/:userId", auth("admin", "customer"), userControllers.getUser);

router.put("/:userId", auth("admin", "customer"), userControllers.putUser);

router.delete(
  "/:userId",
  auth("admin", "customer"),
  userControllers.deleteUser
);

export const usersRoutes = router;
