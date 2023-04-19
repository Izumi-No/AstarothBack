import { Module } from '@nestjs/common';
import { Hasher } from './hasher';
import { Argon2Hasher } from './argon2/argon2Hasher';

@Module({
  providers: [
    {
      provide: Hasher,
      useClass: Argon2Hasher,
    },
  ],
  exports: [
    {
      provide: Hasher,
      useClass: Argon2Hasher,
    },
  ],
})
export class CryptoModule {}
