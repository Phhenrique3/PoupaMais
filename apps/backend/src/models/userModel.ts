import { prisma } from "../config/prisma";

export const UserModel = {
  findByEmail(email: string) {
    try {
      return prisma.user.findUnique({ where: { email } });
    } catch (err) {
      console.error("Erro ao buscar usuário por email", err);
      throw new Error("Erro interno do servidor");
    }
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
  create(data: { name: string; email: string; password: string }) {
    return prisma.user.create({ data });
  },

  getAll(filters?: { name?: string; email?: string }) {
    return prisma.user.findMany({
      where: {
        ...(filters?.name && {
          name: {
            contains: filters.name,
            mode: "insensitive",
          },
        }),
        ...(filters?.email && {
          email: {
            contains: filters.email,
            mode: "insensitive",
          },
        }),
      },
    });
  },

  update(
    id: string,
    data: Partial<{ name: string; email: string; password: string }>,
  ) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  },
};
