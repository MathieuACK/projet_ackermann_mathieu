"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = authenticateJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
/**
 * Middleware to authenticate JWT tokens
 * Checks for Authorization header with Bearer token
 * Verifies token and attaches user info to request
 */
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header is required",
        });
    }
    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({
            message: "Token is required",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token",
        });
    }
}
