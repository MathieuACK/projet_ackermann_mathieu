import { Express, Router } from "express";
import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from "../controllers/pollution.controllers";
import { authenticateJWT } from "../middlewares/auth.middleware";

export function pollutions(app: Express) {
  const router = Router();

  router.get("/", getAll); // Public route
  router.get("/:id", getById); // Public route
  router.post("/", create); // Now public route
  router.put("/:id", authenticateJWT, update); // Protected
  router.delete("/:id", authenticateJWT, deleteById); // Protected

  app.use("/api/pollutions", router);
}
