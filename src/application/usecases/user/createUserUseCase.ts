import { UserEntity } from '@/domain/entities/User/user';
import { BaseUseCase } from '../baseUseCase';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repositories/userRepository';

@Injectable()
export class CreateUserUseCase extends BaseUseCase<
  createUserUseCase.Request,
  createUserUseCase.Response
> {
  constructor(private readonly userRepo: UserRepository) {
    super();
  }

  async execute(
    request: createUserUseCase.Request,
  ): Promise<createUserUseCase.Response> {
    const userOrError = UserEntity.create(request);

    if (userOrError.isLeft()) {
      throw userOrError.error;
    }

    if (await this.userRepo.exists(userOrError.value.email)) {
      throw new Error('User already exists');
    }

    const user = {
      id: userOrError.value.id,
      name: userOrError.value.name,
      email: userOrError.value.email,
      password: await userOrError.value.password.getHashedValue(),
    };

    await this.userRepo.save(userOrError.value);
    return { user };
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace createUserUseCase {
  export type Request = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
  export type Response = {
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
    };
  };
}
