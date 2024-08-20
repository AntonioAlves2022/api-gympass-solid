import fastify from 'fastify'
import { usersRoutes } from './http/routes/user-routes';


export const app = fastify();
app.register(usersRoutes)



