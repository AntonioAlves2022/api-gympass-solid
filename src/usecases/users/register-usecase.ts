import {hash} from 'bcryptjs'
import type { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists'
import type { User } from '@prisma/client'

interface RegisterUseCaseRequest{
  name:string
  email:string
  password:string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUserUseCase{
  constructor(private usersRepository:UsersRepository){}

  async execute({name, email, password}: RegisterUseCaseRequest):Promise<RegisterUseCaseResponse> {
    // Criptografar a senha do usuario
    const password_hash = await hash(password, 6)
    // Verificar se o e-mail de registro já está em uso
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email)
    if(emailAlreadyInUse){
      throw new UserAlreadyExistsError()
    }
    // Salvar os dados do usuario com o prisma
    const user = await this.usersRepository.create({
      name, email, password_hash
    })

    return {user}
  }
}


