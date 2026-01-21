"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pollutions = pollutions;
const express_1 = require("express");
const pollution_controllers_1 = require("../controllers/pollution.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
function pollutions(app) {
    const router = (0, express_1.Router)();
    router.get("/", pollution_controllers_1.getAll); // Public route
    router.get("/:id", pollution_controllers_1.getById); // Public route
    router.post("/", auth_middleware_1.authenticateJWT, pollution_controllers_1.create); // Protected
    router.put("/:id", auth_middleware_1.authenticateJWT, pollution_controllers_1.update); // Protected
    router.delete("/:id", auth_middleware_1.authenticateJWT, pollution_controllers_1.deleteById); // Protected
    app.use("/api/pollutions", router);
}
