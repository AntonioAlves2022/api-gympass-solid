import { UserAlreadyExistsError } from '@/usecases/errors/user-already-exists'
import { makeRegisterUseCase } from '@/usecases/factories/make-register-usecase'
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

    const registerUserUseCase = makeRegisterUseCase()
    await registerUserUseCase.execute({name, email, password})
  }catch(error){
    if(error instanceof UserAlreadyExistsError){
      return reply.status(409).send({message:error.message})
    }
    // Lançar o erro para a próxima camada tratar (app.ts)
    throw error

  }
  return reply.status(201).send()
}
