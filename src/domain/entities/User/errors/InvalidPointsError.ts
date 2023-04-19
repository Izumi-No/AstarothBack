import { DomainError } from '@/utils/domain/domainError';

export class InvalidPointsError extends Error implements DomainError {
  constructor() {
    super(`This points are invalid is invalid.`);
    this.name = 'InvalidPointsError';
  }
}
