import { UserEntity } from '../entities/User/user';

export abstract class UserRepository {
  abstract save(user: UserEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract find(id: string): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract findByEmail(email: string): Promise<UserEntity>;
  abstract exists(email: string): Promise<boolean>;
}
