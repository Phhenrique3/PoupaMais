import { Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "../DTOs/authDtos";
import { updateUserDto } from "../DTOs/updateAuth";
import { AuthRequest } from "../middlewares/authMiddleware";
import { AuthService } from "../services/authService";

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export const AuthController = {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body as Partial<RegisterDTO>;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "A senha deve ter ao menos 6 caracteres" });
    }

    try {
      const user = await AuthService.register({ name, email, password });
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ message: errorMessage(err, "Erro ao registrar usuário") });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body as Partial<LoginDTO>;

    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
    }

    try {
      const result = await AuthService.login({ email, password });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: errorMessage(err, "Erro ao realizar login") });
    }
  },

  async me(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.me(req.UserId!);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(404).json({ message: errorMessage(err, "Usuário não encontrado") });
    }
  },

  async updateMe(req: AuthRequest, res: Response) {
    const { name, email, password } = req.body as updateUserDto;

    if (!name && !email && !password) {
      return res.status(400).json({ message: "Informe ao menos um campo para atualizar" });
    }

    if (password && password.length < 6) {
      return res.status(400).json({ message: "A senha deve ter ao menos 6 caracteres" });
    }

    try {
      const user = await AuthService.updateUser(req.UserId!, { name, email, password });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ message: errorMessage(err, "Erro ao atualizar usuário") });
    }
  },
};
