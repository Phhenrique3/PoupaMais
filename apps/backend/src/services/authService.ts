import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { AuthResponseDTO, LoginDTO, RegisterDTO } from "../DTOs/authDtos";
import { updateUserDto } from "../DTOs/updateAuth";
import { UserModel } from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_OPTIONS: SignOptions = {
  expiresIn: process.env.JWT_EXPIRES ? parseInt(process.env.JWT_EXPIRES, 10) : 86400,
};

export const AuthService = {
  async register(dto: RegisterDTO) {
    const email = dto.email.trim().toLowerCase();
    const exists = await UserModel.findByEmail(email);
    if (exists) throw new Error("E-mail já cadastrado");

    const user = await UserModel.create({
      name: dto.name.trim(),
      email,
      password: await bcrypt.hash(dto.password, 10),
    });

    return { id: user.id, name: user.name, email: user.email };
  },

  async login(dto: LoginDTO): Promise<AuthResponseDTO> {
    const user = await UserModel.findByEmail(dto.email.trim().toLowerCase());
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new Error("Credenciais inválidas");
    }

    return { token: jwt.sign({ sub: user.id }, JWT_SECRET, JWT_OPTIONS) };
  },

  async me(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("Usuário não encontrado");
    return { id: user.id, name: user.name, email: user.email };
  },

  async updateUser(userId: string, dto: updateUserDto) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("Usuário não encontrado");

    const data: Partial<{ name: string; email: string; password: string }> = {};
    if (dto.name) data.name = dto.name.trim();

    if (dto.email) {
      const email = dto.email.trim().toLowerCase();
      const existing = await UserModel.findByEmail(email);
      if (existing && existing.id !== userId) throw new Error("E-mail já está em uso");
      data.email = email;
    }

    if (dto.password) data.password = await bcrypt.hash(dto.password, 10);

    const updatedUser = await UserModel.update(userId, data);
    return { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email };
  },
};
