"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const pollution_routes_1 = require("./pollution.routes");
const user_routes_1 = require("./user.routes");
const auth_routes_1 = require("./auth.routes");
function routes(app) {
    (0, auth_routes_1.authRoutes)(app);
    (0, pollution_routes_1.pollutions)(app);
    (0, user_routes_1.users)(app);
}
