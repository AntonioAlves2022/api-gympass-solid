import type { GymsRepository } from "@/repositories/gyms-repository";
import type { Gym } from "@prisma/client";

interface GymCreateRequest {
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
}

interface GymCreateResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    name,
    description,
    latitude,
    longitude,
  }: GymCreateRequest): Promise<GymCreateResponse> {
    const gym = await this.gymsRepository.create({
      name,
      description,
      latitude,
      longitude,
    });
    return { gym }
  }
}
