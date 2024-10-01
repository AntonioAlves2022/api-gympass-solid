import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { RegisterUserUseCase } from "../users/register-usecase";

export function makeRegisterUseCase(){
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserUseCase(usersRepository)
  return registerUseCase
}
