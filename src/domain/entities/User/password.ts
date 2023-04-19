import { Either, left, right } from '@/utils/either';

import { InvalidPasswordLengthError } from './errors/invalidPasswordLengthError';

import { hash, verify } from 'argon2';
import { Inject, Injectable } from '@nestjs/common';
import { Hasher } from '@/infrastructure/crypto/hasher';
@Injectable()
export class Password {
  @Inject(Hasher)
  private readonly hasher: Hasher;
  private constructor(private password: string, public hashed: boolean) {}

  static validate(password: string): boolean {
    if (
      !password ||
      password.trim().length < 8 ||
      password.trim().length > 255
    ) {
      return false;
    }

    return true;
  }

  public async getHashedValue(): Promise<string> {
    if (this.hashed) {
      return this.password;
    }

    return await this.hasher.hash(this.password);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;

    if (this.hashed) {
      hashed = this.password;

      return await verify(hashed, plainTextPassword);
    }

    return this.password == plainTextPassword;
  }

  static create(
    password: string,
    hashed = false,
  ): Either<InvalidPasswordLengthError, Password> {
    if (!hashed && !this.validate(password)) {
      return left(new InvalidPasswordLengthError());
    }

    return right(new Password(password, hashed));
  }
}
