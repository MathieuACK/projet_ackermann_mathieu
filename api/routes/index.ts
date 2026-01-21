import { Express } from "express";
import { pollutions } from "./pollution.routes";
import { users } from "./user.routes";
import { authRoutes } from "./auth.routes";

export default function routes(app: Express) {
  authRoutes(app);
  pollutions(app);
  users(app);
}
