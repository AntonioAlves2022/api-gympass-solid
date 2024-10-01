import { UsersInMemoryRepository } from "@/repositories/users-in-memory-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { GetUserProfileUseCase } from "./users/get-user-profile";
let usersRepository:UsersInMemoryRepository
let sut:GetUserProfileUseCase
describe('Get user profile use case', ()=>{
  beforeEach(()=>{
    usersRepository = new UsersInMemoryRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  //1 º Teste
  it('It should be able to get user profile by id', async()=>{

  })
})
