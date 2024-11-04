import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import {describe, it,vi, expect, beforeEach, afterEach} from 'vitest'
import { CheckInUseCase } from './check-in-usecase'
import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository:InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase
describe('Check in use case', () =>{
  beforeEach(()=>{
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      name: 'Profit',
      description: '',
      created_at: new Date(),
      latitude: new Decimal(-29.6345467),
      longitude: new Decimal(-51.0034005)
    })

    vi.useFakeTimers()
  })

  afterEach(()=>{
    vi.useRealTimers()
  })

  it('Should be able to check in', async ()=>{
    vi.setSystemTime(new Date(2023,11,23,12,40,0))
    const {checkIn} = await sut.execute({
      userId: 'usuario-0001',
      gymId:'gym-01',
      // -29.6345467 -51.0034005
      userLatitude: -29.6345467,
      userLongitude:-51.0034005
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
      gymId: 'gym-01',
      userLatitude: -29.6345467,
      userLongitude:-51.0034005
    })
    await expect(()=> sut.execute({
      userId: '00001',
      gymId: 'gym-01',
      userLatitude: -29.6368293,
      userLongitude:-51.0034005
    })).rejects.toBeInstanceOf(Error)
  }
)

// teste 3
it('It should be able to check in twice in different days',
  async()=>{
    vi.setSystemTime(new Date(2024,9,20,16,0,0))
     await sut.execute({
      userId: '00001',
      gymId: 'gym-01',
      userLatitude: -29.6345467,
      userLongitude:-51.0034005
    })
    vi.setSystemTime(new Date(2024,9,23,16,0,0))
    const {checkIn} = await sut.execute({
      userId: '00001',
      gymId: 'gym-01',
      userLatitude: -29.6345467,
      userLongitude:-51.0034005
    })
    expect(checkIn.id).toEqual(expect.any(String))
  }
)
  it('Should not be able to check in on a distant gym',async ()=>{
    gymsRepository.items.push({
      id: 'gym-02',
      name: 'Profit',
      description: '',
      created_at: new Date(),
      latitude: new Decimal(-29.6345467),
      longitude: new Decimal(-51.0034005)
    })

    await expect(()=>
    sut.execute({
      userId: 'User-01',
      gymId: 'gym-02',
      userLatitude: -29.6368293,
      userLongitude:-51.0095088
    })
    ).rejects.toBeInstanceOf(Error)
  })
})
