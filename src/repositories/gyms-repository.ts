import type { Gym, Prisma } from "@prisma/client";

export interface GymsRepository{
  findById(id:String):Promise<Gym|null>
  create(data: Prisma.GymUncheckedCreateInput):Promise<Gym>
}
