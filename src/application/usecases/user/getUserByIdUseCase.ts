import { UserRepository } from '@/domain/repositories/userRepository';
import { BaseUseCase } from '../baseUseCase';

export class GetUserByIdUseCase extends BaseUseCase<
  GetUserByIdUseCase.Request,
  GetUserByIdUseCase.Response
> {
  constructor(private readonly userRepo: UserRepository) {
    super();
  }
  async execute(
    request: GetUserByIdUseCase.Request,
  ): Promise<GetUserByIdUseCase.Response> {
    const user = await this.userRepo.find(request.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: await user.password.getHashedValue(),
        points: user.points,
      },
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace GetUserByIdUseCase {
  export type Request = {
    id: string;
  };
  export type Response = {
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
      points: number;
    };
  };
}
