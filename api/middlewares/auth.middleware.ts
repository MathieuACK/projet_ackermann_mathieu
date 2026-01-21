import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

// Extend Express Request type to include user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    login: string;
  };
}

/**
 * Middleware to authenticate JWT tokens
 * Checks for Authorization header with Bearer token
 * Verifies token and attaches user info to request
 */
export function authenticateJWT(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
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
    const decoded = jwt.verify(token, config.JWT_SECRET) as {
      id: string;
      login: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}
