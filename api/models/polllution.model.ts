import { DataTypes, Sequelize } from "sequelize";

export const pollutionModel = (sequelize: Sequelize) => {
  return sequelize.define("pollutions", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    discoveryDate: {
      type: DataTypes.DATE,
    },
    pollutionType: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    latitude: {
      // stocke les coordonnées GPS avec 6 décimales
      type: DataTypes.DECIMAL(9, 6),
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
    },
    photographUrl: {
      type: DataTypes.STRING,
    },
    photographData: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
      comment: "Image stored as base64 string",
    },
    discovererName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discovererEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
  });
};
