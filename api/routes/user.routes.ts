import { Express, Router } from "express";
import { create, getAll } from "../controllers/user.controllers";
import { authenticateJWT } from "../middlewares/auth.middleware";

export function users(app: Express) {
  const router = Router();

  router.get("/", authenticateJWT, getAll);
  router.post("/", create); // Public route for registration

  app.use("/api/users", router);
}
