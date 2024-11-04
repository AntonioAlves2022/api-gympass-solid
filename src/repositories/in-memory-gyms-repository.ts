import type { Gym } from "@prisma/client";
import type { GymsRepository } from "./gyms-repository";

export class InMemoryGymsRepository implements GymsRepository{
  public items:Gym[] = []
  async findById(id: String): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === id)

    if(!gym){
      return null
    }
    return gym

  }

}