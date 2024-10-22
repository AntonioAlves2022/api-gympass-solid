import { FastifyInstance } from 'fastify'
import { register } from '../controllers/register'
import { authenticate } from '../controllers/authenticate'

export async function usersRoutes(app:FastifyInstance) {
  app.get('/users', ()=>{
    return {message:'Server online'}
  })
  app.post('/users', register)
  app.post('/sessions', authenticate)
}


