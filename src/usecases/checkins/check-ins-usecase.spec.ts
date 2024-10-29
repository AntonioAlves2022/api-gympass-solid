import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import {describe, it,vi, expect, beforeEach, afterEach} from 'vitest'
import { CheckInUseCase } from './check-in-usecase'

let checkInsRepository:InMemoryCheckInsRepository
let sut: CheckInUseCase
describe('Check in use case', () =>{
  beforeEach(()=>{
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(()=>{
    vi.useRealTimers()
  })

  it('Should be able to check in', async ()=>{
    vi.setSystemTime(new Date(2023,11,23,12,40,0))
    const {checkIn} = await sut.execute({
      userId: 'usuario-0001',
      gymId:'abl-0001'
    })
    console.log(checkIn.created_at)
    expect(checkIn.id).toEqual(expect.any(String))
  })

  // 2º Teste - TDD (test driven development)
  // red, green, refactor
it('It should not be able to check in twice in same day',
  async()=>{
    vi.setSystemTime(new Date(2024,9,20,16,0,0))
    const {checkIn} = await sut.execute({
      userId: '00001',
      gymId: '171'
    })
    await expect(()=> sut.execute({
      userId: '00001',
      gymId: '157'
    })).rejects.toBeInstanceOf(Error)
  }
)

// teste 3
it('It should be able to check in twice in different days',
  async()=>{
    vi.setSystemTime(new Date(2024,9,20,16,0,0))
     await sut.execute({
      userId: '00001',
      gymId: '171'
    })
    vi.setSystemTime(new Date(2024,9,23,16,0,0))
    const {checkIn} = await sut.execute({
      userId: '00001',
      gymId: '157'
    })
    expect(checkIn.id).toEqual(expect.any(String))
  }
)

})
