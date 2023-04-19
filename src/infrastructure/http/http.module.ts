import { Module } from '@nestjs/common';
import { DatabaseModule } from '../persistence/persistence.module';
import { UsersController } from './controllers/users.controller';
import { createUserUseCase } from '@/application/usecases/user/createUserUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [createUserUseCase],
})
export class HTTPModule {}
