import { Either, left, right } from '@/utils/either';
import { InvalidPointsError } from './errors/InvalidPointsError';

export class Points {
  private readonly _value: number;

  private constructor(value: number) {
    this._value = value;
  }
  //TODO: add more especific errors

  public static create(value: number): Either<InvalidPointsError, Points> {
    if (value < 0) {
      return left(new InvalidPointsError());
    }
    return right(new Points(value));
  }

  get value(): number {
    return this._value;
  }
}
