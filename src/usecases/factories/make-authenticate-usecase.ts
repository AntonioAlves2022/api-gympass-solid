import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";
import { au } from "vitest/dist/chunks/reporters.C_zwCd4j";

export function makeAuthenticateUseCase(){
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)
  return authenticateUseCase

}
