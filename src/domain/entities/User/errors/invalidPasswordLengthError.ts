import { DomainError } from '@/utils/domain/domainError';

export class InvalidPasswordLengthError extends Error implements DomainError {
  constructor() {
    super(`The password must have between 8 and 255 characters.`);
    this.name = 'InvalidPasswordLengthError';
  }
}
