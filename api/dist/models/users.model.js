"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersModel = void 0;
const sequelize_1 = require("sequelize");
const usersModel = (sequelize) => {
    const Users = sequelize.define("users", {
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING,
        },
        firstname: {
            type: sequelize_1.DataTypes.STRING,
        },
        login: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
    return Users;
};
exports.usersModel = usersModel;
