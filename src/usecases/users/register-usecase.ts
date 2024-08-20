import {hash} from 'bcryptjs'
import { prisma } from '@/libs/prisma'
interface RegisterUseCaseRequest{
  name:string
  email:string
  password:string
}
export async function registerUseCase(
  {name,
    email,
    password
  }:RegisterUseCaseRequest){

    // Criptografar a senha do usuario
    const password_hash = await hash(password, 6)
    // Verificar se o e-mail de registro já está em uso
    const emailAlreadyInUse = await prisma.user.findUnique({where:{email}})
    if(emailAlreadyInUse){
      throw new Error('E-mail already exists')
    }
    // Salvar os dados do usuario com o prisma
    await prisma.user.create({
      data:{
        name, email, password_hash
      }
    })

}
