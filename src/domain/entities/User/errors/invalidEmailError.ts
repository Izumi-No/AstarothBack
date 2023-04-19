import { DomainError } from '@/utils/domain/domainError';

export class InvalidEmailError extends Error implements DomainError {
  constructor(email: string) {
    super(`The email "${email}" is invalid.`);
    this.name = 'InvalidEmailError';
  }
}
