import { randomUUID } from 'crypto';

export class baseEntity<T> {
  private readonly _id: string;

  constructor(protected props: T, id?: string) {
    this._id = id ? id : randomUUID();
  }

  get id(): string {
    return this._id;
  }
}
