import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import {describe, it, expect, beforeEach} from 'vitest'
import { CreateGymUseCase } from './create-gym-usecase'

describe('Create Gym UseCase', ()=>{
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymUseCase

  beforeEach(()=>{
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  //Faça seus teste aqui
  it('Should be able to create a new gym', async()=>{
    const {gym} = await sut.execute({
      name: 'Academia Javascript',
      description: 'Exercita o cérebro',
      latitude:-29.638656,
      longitude: -51.003392
    })
    expect(gym.id).toEqual(expect.any(String))
  })
  // Outro teste aqui
})
