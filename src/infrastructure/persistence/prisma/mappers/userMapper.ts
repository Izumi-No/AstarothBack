import { UserEntity } from '@/domain/entities/User/user';
import { User } from '@prisma/client';

export class UserMapper {
  static async toPersistence(user: UserEntity): Promise<User> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: await user.password.getHashedValue(),
      points: user.points,
    };
  }

  static toDomain(user: User): UserEntity {
    const userOrError = UserEntity.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        points: user.points,
      },
      user.id,
    );

    if (userOrError.isLeft()) {
      throw userOrError.error;
    }

    return userOrError.value;
  }
}
