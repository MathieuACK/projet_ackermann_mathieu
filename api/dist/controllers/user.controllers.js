"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.create = create;
const models_1 = __importDefault(require("../models"));
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function getAll(req, res) {
    const data = await models_1.default.users.findAll().catch((err) => {
        res.status(400).send(err);
    });
    res.json(data);
}
async function create(req, res) {
    const id = (0, uuid_1.v7)();
    const user = {
        id: id,
        login: req.body.login,
        password: req.body.password,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
    };
    if (user.login && user.password && user.lastname && user.firstname) {
        // Check if login already exists
        const existing = await models_1.default.users
            .findOne({ where: { login: user.login } })
            .catch((err) => {
            // DB error
            res.status(500).send({ message: "Database error", error: err });
        });
        if (existing) {
            return res
                .status(409)
                .send({ message: "User with this login already exists" });
        }
        // Hash password before creating user
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
        user.password = hashedPassword;
        return models_1.default.users.create(user).then((data) => {
            res.send(data);
        });
    }
    let message = "missing parameters";
    if (!user.login) {
        message += " login";
    }
    if (!user.password) {
        message += " password";
    }
    if (!user.lastname) {
        message += " lastname";
    }
    if (!user.firstname) {
        message += " firstname";
    }
    res.status(400).send({ message: message });
}
