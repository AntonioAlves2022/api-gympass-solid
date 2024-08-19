import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'
import { hash } from 'bcryptjs'
import { prisma } from '@/libs/prisma'

export async function register(request:FastifyRequest, reply:FastifyReply){
  const userBodySchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const {name, email, password} = userBodySchema.parse(request.body)
  const password_hash = await hash(password, 6)
  await prisma.user.create({
    data:{
      name,
      email,
      password_hash
    }
  })

  return reply.status(201).send()
}
