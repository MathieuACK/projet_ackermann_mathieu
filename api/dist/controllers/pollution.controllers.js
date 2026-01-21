"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.deleteById = deleteById;
const models_1 = __importDefault(require("../models"));
async function getAll(req, res) {
    const data = await models_1.default.pollutions.findAll().catch((err) => {
        res.status(400).send(err);
    });
    res.json(data);
}
async function getById(req, res) {
    const { id } = req.params;
    const data = await models_1.default.pollutions.findByPk(id).catch((err) => {
        res.status(400).send(err);
    });
    res.setHeader("Content-Type", "application/json");
    res.send(data);
}
async function create(req, res) {
    console.log(req.body);
    const data = await models_1.default.pollutions.create(req.body).catch((err) => {
        res.status(400).send(err);
        console.log(err);
    });
    res.json(data);
}
async function update(req, res) {
    const { id } = req.params;
    await models_1.default.pollutions
        .update(req.body, {
        where: { id },
    })
        .catch((err) => {
        res.status(400).send(err);
    });
    res.setHeader("Content-Type", "application/json");
    res.sendStatus(200);
}
async function deleteById(req, res) {
    const { id } = req.params;
    await models_1.default.pollutions
        .destroy({
        where: { id },
    })
        .catch((err) => {
        res.status(400).send(err);
    });
    res.setHeader("Content-Type", "application/json");
    res.sendStatus(200);
}
