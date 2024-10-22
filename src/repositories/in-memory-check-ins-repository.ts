import type { Prisma, CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "./check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository{
  public items:CheckIn[] = [] // lista vazia que representa o banco de dados
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at):null,
      created_at: new Date()
    }
    this.items.push(checkIn)
    return checkIn
  }

}
