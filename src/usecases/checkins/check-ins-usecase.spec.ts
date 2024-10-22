import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import {describe, it, expect, beforeEach} from 'vitest'
import { CheckInUseCase } from './check-in-usecase'

let checkInsRepository:InMemoryCheckInsRepository
let sut: CheckInUseCase
describe('Check in use case', () =>{
  beforeEach(()=>{
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })
  it('Should be able to check in', async ()=>{
    const {checkIn} = await sut.execute({
      userId: 'usuario-0001',
      gymId:'abl-0001'
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  // 2º Teste
})
