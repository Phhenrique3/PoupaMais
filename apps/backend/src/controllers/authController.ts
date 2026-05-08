import { NextFunction, Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "../DTOs/authDtos";
import { updateUserDto } from "../DTOs/updateAuth";
import badRequestError from "../middlewares/Error/badRequestError";
import { AuthService } from "../services/authService";

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body as Partial<RegisterDTO>;

    if (!name || !email || !password) {
      throw new badRequestError(
        "name, e-maill e password são obrigatórios",
      );
    }

    try {
      const user = await AuthService.register({ name, email, password });
      return res.status(201).json(user);
    } catch (err) {
      return next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as Partial<LoginDTO>;

    if (!email || !password) {
      throw new badRequestError("e-mail e password são obrigatorios");
    }
    try {
      const result = await AuthService.login({ email, password });
      const token = result.token;

      res.cookie("toke", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 24,
      });
      return res.status(200).json({
        message: "login realizado com sucesso",
      });
    } catch (err) {
      return next(err);
    }
  },
  async getAll(req: Request, res: Response, next: NextFunction) {
    const { name, email } = req.query;

    try {
      const users = await AuthService.getAllUsers({
        name: name as string | undefined,
        email: email as string | undefined,
      });

      return res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userId = Array.isArray(id) ? id[0] : id;

    const { name, email, password } = req.body as updateUserDto;

    if (!userId) {
      throw new badRequestError("ID do usuário é obrigatório");
    }

    if (!name && !email && !password) {
      throw new badRequestError("Informe ao menos um campo para atualizar");
    }

    try {
      const updatedUser = await AuthService.updateUser(userId, {
        name,
        email,
        password,
      });

      return res.status(200).json(updatedUser);
    } catch (err) {
      return next(err);
    }
  },
};
