import type { Prisma, User } from "@prisma/client";
import {prisma} from '@/libs/prisma'
import type { UsersRepository } from "./users-repository";
export class PrismaUsersRepository implements UsersRepository{

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({where:{email}})
    return user
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({data})
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where:{id}
    })
    return user
  }
}
