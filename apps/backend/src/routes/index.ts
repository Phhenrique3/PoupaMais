// apps/backend/src/routes/index.ts
import { Router } from "express";
import { authRoutes } from "./authRoutes";

export const routes = Router();

// tudo que é auth começa com /api/auth
routes.use("/auth", authRoutes);
