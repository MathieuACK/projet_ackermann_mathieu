"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = users;
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
function users(app) {
    const router = (0, express_1.Router)();
    router.get("/", auth_middleware_1.authenticateJWT, user_controllers_1.getAll);
    router.post("/", user_controllers_1.create); // Public route for registration
    app.use("/api/users", router);
}
