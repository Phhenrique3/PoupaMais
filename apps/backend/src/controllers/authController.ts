import { Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "../DTOs/authDtos";
import { updateUserDto } from "../DTOs/updateAuth";
import { AuthService } from "../services/authService";

export const AuthController = {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body as Partial<RegisterDTO>;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email e password são obrigatórios" });
    }

    try {
      const user = await AuthService.register({ name, email, password });
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message ?? "Erro ao registrar usuário",
      });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body as Partial<LoginDTO>;

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "email e password são obrigatórios" });
    }

    try {
      const result = await AuthService.login({ email, password });
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message ?? "Erro ao realizar login",
      });
    }
  },

  async getAll(req: Request, res: Response) {
    const { name, email } = req.query;

    try {
      const users = await AuthService.getAllUsers({
        name: name as string | undefined,
        email: email as string | undefined,
      });

      return res.status(200).json(users);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message ?? "Erro ao listar usuários",
      });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const userId = Array.isArray(id) ? id[0] : id;

    const { name, email, password } = req.body as updateUserDto;

    if (!userId) {
      return res.status(400).json({
        message: "ID do usuário é obrigatório",
      });
    }

    if (!name && !email && !password) {
      return res.status(400).json({
        message: "Informe ao menos um campo para atualizar",
      });
    }

    try {
      const updatedUser = await AuthService.updateUser(userId, {
        name,
        email,
        password,
      });

      return res.status(200).json(updatedUser);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message ?? "Erro ao atualizar usuário",
      });
    }
  },
};
