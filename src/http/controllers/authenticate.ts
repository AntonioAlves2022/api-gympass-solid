import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { AuthenticateUseCase } from "@/usecases/authenticate";
import type { FastifyReply, FastifyRequest } from "fastify";
import{z} from 'zod'

export async function authenticate(request: FastifyRequest, reply:FastifyReply){
  const authenticateBodySchema = z.object({
    email: z.string(),
    password:z.string()
  })

  const {email, password} = authenticateBodySchema.parse(request.body)

  try{
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
    await authenticateUseCase.execute({email, password})

  }

}
