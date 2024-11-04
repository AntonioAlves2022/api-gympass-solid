import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import {describe, it,vi, expect, beforeEach, afterEach} from 'vitest'
import { CheckInUseCase } from './check-in-usecase'
import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'

let checkInsRepository:InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase
describe('Check in use case', () =>{
  beforeEach(()=>{
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()
  })

  afterEach(()=>{
    vi.useRealTimers()
  })

  it('Should be able to check in', async ()=>{
    vi.setSystemTime(new Date(2023,11,23,12,40,0))
    const {checkIn} = await sut.execute({
      userId: 'usuario-0001',
      gymId:'abl-0001',
      userLatitude: -29.6368293,
      userLongitude:-51.0095088
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
      gymId: '171',
      userLatitude: -29.6368293,
      userLongitude:-51.0095088
    })
    await expect(()=> sut.execute({
      userId: '00001',
      gymId: '157',
      userLatitude: -29.6368293,
      userLongitude:-51.0095088
    })).rejects.toBeInstanceOf(Error)
  }
)

// teste 3
it('It should be able to check in twice in different days',
  async()=>{
    vi.setSystemTime(new Date(2024,9,20,16,0,0))
     await sut.execute({
      userId: '00001',
      gymId: '171',
      userLatitude: -29.6368293,
      userLongitude:-51.0095088
    })
    vi.setSystemTime(new Date(2024,9,23,16,0,0))
    const {checkIn} = await sut.execute({
      userId: '00001',
      gymId: '157',
      userLatitude: -29.6368293,
      userLongitude:-51.0095088
    })
    expect(checkIn.id).toEqual(expect.any(String))
  }
)

})
