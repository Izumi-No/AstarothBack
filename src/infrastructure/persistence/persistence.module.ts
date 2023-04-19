import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@/domain/repositories/userRepository';
import { PrismaUserRepository } from './prisma/repositories/prismaUserRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class DatabaseModule {}
