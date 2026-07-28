import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { requireAuth } from "../middlewares/authMiddleware";

export const authRoutes = Router();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.get("/me", requireAuth, AuthController.me);
authRoutes.patch("/me", requireAuth, AuthController.updateMe);
