import { registerUseCase } from '@/usecases/users/register-usecase'
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
    await registerUseCase({name, email, password})
  }catch(error){
    return reply.status(409).send()
  }
  return reply.status(201).send()
}
