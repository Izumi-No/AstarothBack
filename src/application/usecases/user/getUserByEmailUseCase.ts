import { UserRepository } from '@/domain/repositories/userRepository';
import { BaseUseCase } from '../baseUseCase';

export class GetUserByEmailUseCase extends BaseUseCase<
  GetUserByEmailUseCase.Request,
  GetUserByEmailUseCase.Response
> {
  constructor(private readonly userRepo: UserRepository) {
    super();
  }
  async execute(
    request: GetUserByEmailUseCase.Request,
  ): Promise<GetUserByEmailUseCase.Response> {
    const user = await this.userRepo.findByEmail(request.email);

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
namespace GetUserByEmailUseCase {
  export type Request = {
    email: string;
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
