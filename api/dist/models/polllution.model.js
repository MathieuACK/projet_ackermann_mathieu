"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pollutionModel = void 0;
const sequelize_1 = require("sequelize");
const pollutionModel = (sequelize) => {
    return sequelize.define("pollutions", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: sequelize_1.DataTypes.STRING,
        },
        observationDate: {
            type: sequelize_1.DataTypes.DATE,
        },
        pollutionType: {
            type: sequelize_1.DataTypes.STRING,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
        },
        latitude: {
            // stocke les coordonnées GPS avec 6 décimales
            type: sequelize_1.DataTypes.DECIMAL(9, 6),
        },
        longitude: {
            type: sequelize_1.DataTypes.DECIMAL(9, 6),
        },
        photographUrl: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
};
exports.pollutionModel = pollutionModel;
