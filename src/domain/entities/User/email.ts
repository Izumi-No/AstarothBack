import { Either, left, right } from '@/utils/either';
import { InvalidEmailError } from './errors/invalidEmailError';

export class Email {
  static emailRgx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public value: string) {
    this.value = value;
  }

  public static validate(email: string): boolean {
    if (this.emailRgx.test(email)) {
      return true;
    }

    return false;
  }

  public static create(email: string): Either<InvalidEmailError, Email> {
    if (!this.validate(email)) {
      return left(new InvalidEmailError(email));
    }

    return right(new Email(email));
  }
}
