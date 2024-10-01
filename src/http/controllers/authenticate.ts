import { InvalidCredentialsError } from "@/usecases/errors/invalid-credential-error";
import { makeAuthenticateUseCase } from "@/usecases/factories/make-authenticate-usecase";
import type { FastifyReply, FastifyRequest } from "fastify";
import{z} from 'zod'

export async function authenticate(request: FastifyRequest, reply:FastifyReply){
  const authenticateBodySchema = z.object({
    email: z.string(),
    password:z.string()
  })

  const {email, password} = authenticateBodySchema.parse(request.body)

  try{

    const authenticateUseCase = makeAuthenticateUseCase()
    await authenticateUseCase.execute({email, password})
  }catch(error){
    if(error instanceof InvalidCredentialsError){
      return reply.status(400).send({message: 'Invalid E-mail or passowrd'})
    }
    throw error
  }
  return reply.status(200).send({message: 'Authentication successfull!'})
}
