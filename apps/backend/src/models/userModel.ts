import { create } from "domain";
import { prisma } from "../config/prisma"

export const UserModel = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({where:{id}})
  },
  create(data: { name: string; email: string; password: string }) {
    return prisma.user.create({data})
    
  },
};