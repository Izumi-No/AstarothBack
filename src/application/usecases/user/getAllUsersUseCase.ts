import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../baseUseCase';
import { UserRepository } from '@/domain/repositories/userRepository';

@Injectable()
export class GetAllUsersUseCase extends BaseUseCase<
  getAllUsersUseCase.Request,
  getAllUsersUseCase.Response
> {
  constructor(private readonly userRepo: UserRepository) {
    super();
  }
  async execute(
    request: getAllUsersUseCase.Request,
  ): Promise<getAllUsersUseCase.Response> {
    const users = await this.userRepo.findAll();

    const usersResponse = users.map(async (user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: await user.password.getHashedValue(),
      points: user.points,
    }));

    return { users: await Promise.all(usersResponse) };
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace getAllUsersUseCase {
  // eslint-disable-next-line @typescript-eslint/ban-types
  export type Request = {};
  export type Response = {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      points: number;
    }[];
  };
}
