import fastify from 'fastify'
import {z} from 'zod'
import { hash } from 'bcryptjs'
import { prisma } from './libs/prisma'

export const app = fastify();

