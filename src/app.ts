import fastify from 'fastify'
import { ZodError } from 'zod'
import { usersRoutes } from './http/routes/user-routes'
import { env } from './env'


export const app = fastify();
app.register(usersRoutes)

// Handler global de erros da aplicação
app.setErrorHandler((error, request, reply)=>{
  if(error instanceof ZodError){
    return reply.status(400).send({
      message:'Validation error',
      issues: error.format()
    })
  }
  //exibir a pilha(stack de erros no console)
  if(env.NODE_ENV !== 'production'){
    console.error()
  }else{
    // Usar alguma ferramenta para a criação de logs
    //DataLog, Sentry, NewRelic
  }
  return reply.status(500).send({message: 'Internal server error'})
})



