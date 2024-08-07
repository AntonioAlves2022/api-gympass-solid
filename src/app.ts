import fastify from "fastify";
import {z} from 'zod'
import { prisma } from "./libs/prisma";

export const app = fastify();

app.post('/users', async(request, reply)=>{
  
})
