import { Either, right } from '@/utils/either';
import { baseEntity } from '../baseEntity';
import { Password } from './password';
import { Email } from './email';
import { Name } from './name';
import { InvalidEmailError } from './errors/invalidEmailError';
import { InvalidNameError } from './errors/invalidNameError';
import { InvalidPasswordLengthError } from './errors/invalidPasswordLengthError';
import { Points } from './points';
import { InvalidPointsError } from './errors/InvalidPointsError';

export class UserEntity extends baseEntity<UserEntity.Props> {
  private constructor(props: UserEntity.Props, id?: string) {
    super(props, id);
  }

  public static create(
    props: UserEntity.createInput,
    id?: string,
  ): UserEntity.createOutput {
    const nameOrError = Name.create(props.name);
    const emailOrError = Email.create(props.email);
    const pointsOrError = Points.create(props.points || 0);

    if (nameOrError.isLeft()) {
      return nameOrError;
    }

    if (emailOrError.isLeft()) {
      return emailOrError;
    }

    if (pointsOrError.isLeft()) {
      return pointsOrError;
    }

    const passwordOrError = Password.create(props.password);

    if (passwordOrError.isLeft()) {
      return passwordOrError;
    }

    const user = new UserEntity(
      {
        name: nameOrError.value,
        email: emailOrError.value,
        password: passwordOrError.value,
        points: pointsOrError.value,
      },
      id,
    );

    return right(user);
  }

  get name(): string {
    return this.props.name.value;
  }

  get email(): string {
    return this.props.email.value;
  }
  get password(): Password {
    return this.props.password;
  }
  get points(): number {
    return this.props.points.value;
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    return await this.props.password.comparePassword(plainTextPassword);
  }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace UserEntity {
  export interface Props {
    name: Name;
    email: Email;
    password: Password;
    points: Points;
  }
  export interface createInput {
    name: string;
    email: string;
    password: string;
    points?: number;
  }
  export type createOutput = Either<
    | InvalidEmailError
    | InvalidNameError
    | InvalidPasswordLengthError
    | InvalidPointsError,
    UserEntity
  >;
}
