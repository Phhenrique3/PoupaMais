import { Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "../DTOs/authDtos.ts";
import { AuthService } from "../services/authService.ts";

export const AuthController = {
  async register(req: Request, res: Response) {
    const { nome, email, password } = req.body as Partial<RegisterDTO>;
    
    if (!nome || !email || !password) {
      return res.status(400).json({ message: "name, email, e password são obrigatórias " });
    }
    try {
      const user = await AuthService.register({ nome, email, password });
      return res.status(201).json(user)
    } catch (err:any) {
      return res.status(400).json({message: err.message ?? "Error"})
    }
  },
  async login(req: Request, res: Response) {
    const { email, password } = req.body as Partial<LoginDTO>
    
    if (!email || !password) {
      return res.status(401).json({message: "email e password são obrigatório"})
    }
    try {
      const result = await AuthService.login({ email, password })
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({message:err.message ?? "Error"})
      
    }
  }
}
