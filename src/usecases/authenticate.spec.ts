import { UsersInMemoryRepository } from '@/repositories/users-in-memory-repository'
import {describe, it, expect} from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credential-error'
// Cria uma suite de testes
describe('Authenticate Use Case', ()=>{
  // Criar um teste de autenticação
  it('Should be able to authenticate user', async() => {
    const usersRepository = new UsersInMemoryRepository()
    // System under testing
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash:await hash('12345678',6)
    })

    const {user} = await sut.execute({
      email: 'jonhdoe@example.com',
      password: '12345678'
    })

    expect(user.id).toEqual(expect.any(String))

    })

    // Teste 02: A autenticação deve falhar por causa do email
    it('Should not be able to authenticate user with wrong email', async() => {
      const usersRepository = new UsersInMemoryRepository()
      const sut = new AuthenticateUseCase(usersRepository)

      await expect(()=>
        sut.execute({
          email: 'jonhdoe@example.com',
          password: '12345678'
        })
      ).rejects.toBeInstanceOf(InvalidCredentialsError)
      })

      // Teste 03: Deve retornar um erro se a senha estiver errada
      it('Should not be able to authenticate user with wrong password', async() => {
        const usersRepository = new UsersInMemoryRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
          name: 'Jonh Doe',
          email: 'jonhdoe@example.com',
          password_hash:await hash('12345678',6)
        })
       await expect(()=>
          sut.execute({
            email: 'jonhdoe@example.com',
            password: '12344321'
          })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)

        })
  })

