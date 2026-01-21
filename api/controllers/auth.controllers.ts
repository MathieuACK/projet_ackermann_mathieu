import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import db from "../models";
import config from "../config";

/**
 * Login endpoint - Authenticates user and returns JWT token
 * POST /api/auth/login
 * Body: { email: string, password: string }
 * Returns: { accessToken: string, user: { id, login, firstname, lastname } }
 */
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    // Find user by login (using email as login)
    const user = (await db.users.findOne({
      where: { login: email },
    })) as any;

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare password with hashed password in database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        id: user.id,
        login: user.login,
      },
      config.JWT_SECRET as string,
      { expiresIn: config.JWT_EXPIRES_IN } as jwt.SignOptions
    );

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
  } catch (error) {
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
export async function register(req: Request, res: Response) {
  const { login, password, firstname, lastname } = req.body;

  if (!login || !password || !firstname || !lastname) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await db.users.findOne({
      where: { login },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this login already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with generated UUID
    const user = (await db.users.create({
      id: randomUUID(),
      login,
      password: hashedPassword,
      firstname,
      lastname,
    })) as any;

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        id: user.id,
        login: user.login,
      },
      config.JWT_SECRET as string,
      { expiresIn: config.JWT_EXPIRES_IN } as jwt.SignOptions
    );

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
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
