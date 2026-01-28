import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

import { AuthResponseDTO, LoginDTO, RegisterDTO } from "../DTOs/authDtos";
import { UserModel } from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const JWT_OPTIONS: SignOptions = {
  expiresIn: process.env.JWT_EXPIRES
    ? parseInt(process.env.JWT_EXPIRES, 10)
    : 86400,
};

export const AuthService = {
  async register(dto: RegisterDTO) {
    const email = dto.email.trim().toLowerCase();

    const exists = await UserModel.findByEmail(email);
    if (exists) throw new Error("Email já cadastrado");

    const password = await bcrypt.hash(dto.password, 10);

    const user = await UserModel.create({
      name: dto.name.trim(),
      email,
      password,
    });
    return { id: user.id, name: user.name, email: user.email };
  },
  async login(dto: LoginDTO): Promise<AuthResponseDTO> {
    const email = dto.email.trim().toLowerCase();
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("Cradencias invalida");

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new Error("Cradenciais invalidar");

    const token = jwt.sign({ sub: user.id }, JWT_SECRET, JWT_OPTIONS);
    return { token };
  },
  async me(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("usuario não encontrado");

    return { id: user.id, name: user.name, email: user.email };
  },

  async getAllUsers(filters?: { name?: string; email?: string }) {
    const users = await UserModel.getAll(filters);

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  },

  async delete(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("Usuário não encontrado")
      
      await UserModel.delete(userId)

      return({mesasge: "Usuário deletado com sucesso"})
    
  },
};
