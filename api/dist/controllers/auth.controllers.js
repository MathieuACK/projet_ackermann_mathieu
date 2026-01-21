"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models"));
const config_1 = __importDefault(require("../config"));
/**
 * Login endpoint - Authenticates user and returns JWT token
 * POST /api/auth/login
 * Body: { email: string, password: string }
 * Returns: { accessToken: string, user: { id, login, firstname, lastname } }
 */
async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }
    try {
        // Find user by login (using email as login)
        const user = await models_1.default.users.findOne({
            where: { login: email },
        });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        // Compare password with hashed password in database
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        // Generate JWT token
        const accessToken = jsonwebtoken_1.default.sign({
            id: user.id,
            login: user.login,
        }, config_1.default.JWT_SECRET, { expiresIn: config_1.default.JWT_EXPIRES_IN });
        // Return token and user info (without password)
        res.json({
            accessToken,
            user: {
                id: user.id,
                login: user.login,
                firstname: user.firstname,
                lastname: user.lastname,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}
/**
 * Register endpoint - Creates new user with hashed password
 * POST /api/auth/register
 * Body: { login: string, password: string, firstname: string, lastname: string }
 */
async function register(req, res) {
    const { login, password, firstname, lastname } = req.body;
    if (!login || !password || !firstname || !lastname) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    try {
        // Check if user already exists
        const existingUser = await models_1.default.users.findOne({
            where: { login },
        });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this login already exists",
            });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create user
        const user = await models_1.default.users.create({
            login,
            password: hashedPassword,
            firstname,
            lastname,
        });
        // Generate JWT token
        const accessToken = jsonwebtoken_1.default.sign({
            id: user.id,
            login: user.login,
        }, config_1.default.JWT_SECRET, { expiresIn: config_1.default.JWT_EXPIRES_IN });
        // Return token and user info
        res.status(201).json({
            accessToken,
            user: {
                id: user.id,
                login: user.login,
                firstname: user.firstname,
                lastname: user.lastname,
            },
        });
    }
    catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}
