import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { UserAlreadyExistsError } from '@/usecases/errors/user-already-exists'
import { RegisterUserUseCase } from '@/usecases/users/register-usecase'
import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'


export async function register(request:FastifyRequest, reply:FastifyReply){
  const userBodySchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6)
  })
  const {name, email, password} = userBodySchema.parse(request.body)
  try{
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(prismaUsersRepository)
    await registerUserUseCase.execute({name, email, password})
  }catch(error){
    if(error instanceof UserAlreadyExistsError){
      return reply.status(409).send({message:error.message})
    }
    return reply.status(500).send()

  }
  return reply.status(201).send()
}
