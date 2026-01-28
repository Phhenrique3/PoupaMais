import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { requireAuth, AuthRequest } from "../middlewares/authMiddleware";
import { AuthService } from "../services/authService";
export const authRoutes = Router();
authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.get("/user" ,AuthController.getAll)
authRoutes.get("/me", requireAuth, async (req: AuthRequest, res) => {
 try {
 const me = await AuthService.me(req.UserId!);
 return res.status(200).json(me);
 } catch (err: any) {
 return res.status(400).json({ message: err.message ?? "Erro" });
 }
});