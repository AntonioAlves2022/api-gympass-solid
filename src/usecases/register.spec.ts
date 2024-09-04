import { UsersInMemoryRepository } from '@/repositories/users-in-memory-repository'
import {describe, it,expect } from 'vitest'
import { RegisterUserUseCase } from './users/register-usecase'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register User UseCase Tests', () =>{
it('Should hash password uppon register', async() =>{
  const usersRepository = new UsersInMemoryRepository()
  const registerUseCase = new RegisterUserUseCase(usersRepository)
  const { user } = await registerUseCase.execute({
    name: 'Jonh Doe',
    email: 'jonh@example.com.br',
    password: '123456'
  })
  console.log(user.password_hash)
  return {user}
})

// Teste 02
it('Should not be able to register with same email twice', async() =>{
  const usersRepository = new UsersInMemoryRepository()
  const registerUseCase = new RegisterUserUseCase(usersRepository)

  const email = 'jonh@example.com.br'

   await registerUseCase.execute({
    name: 'Jonh Doe',
    email,
    password: '123456'
  })
 expect(async() =>{
  await registerUseCase.execute({
    name: 'Jonh Doe',
    email,
    password: '123456'
  })
 }).rejects.toBeInstanceOf(UserAlreadyExistsError)
})

// Teste 03
it('Should be to register an new user', async()=>{
  const usersRepository = new UsersInMemoryRepository()
  const registerUseCase = new RegisterUserUseCase(usersRepository)
  const { user } = await  registerUseCase.execute({
    name: 'Jonh Doe',
    email: 'jonh.doe@example.com',
    password: '12345678'
  })
  expect(user.id).toEqual(expect.any(String))
})
})
