"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const polllution_model_1 = require("./polllution.model");
const users_model_1 = require("./users.model");
const { BDD } = config_1.config;
const sequelize = new sequelize_1.Sequelize(`postgres://${BDD.user}:${BDD.password}@${BDD.host}/${BDD.bdname}`, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: true,
        native: true,
    },
    define: {
        timestamps: false,
    },
});
sequelize
    .sync()
    .then(() => {
    console.log("Synced db.");
})
    .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});
const Pollutions = (0, polllution_model_1.pollutionModel)(sequelize);
const Users = (0, users_model_1.usersModel)(sequelize);
const db = {
    sequelize: sequelize,
    pollutions: Pollutions,
    users: Users,
};
exports.default = db;
