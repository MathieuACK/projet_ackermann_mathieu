import { Express } from "express";
import * as authController from "../controllers/auth.controllers";

export function authRoutes(app: Express) {
  // Public routes
  app.post("/api/auth/login", authController.login);
  app.post("/api/auth/register", authController.register);
}
