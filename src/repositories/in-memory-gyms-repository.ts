import { Gym, Prisma } from "@prisma/client";
import type { GymsRepository } from "./gyms-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date()
    }

    this.items.push(gym)
    return gym

  }

  async findById(id: String): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }
    return gym;
  }
}
