import { Module } from '@nestjs/common';
import { DatabaseModule } from '../persistence/persistence.module';
import { UsersController } from './controllers/users.controller';
import { CreateUserUseCase } from '@/application/usecases/user/createUserUseCase';
import { GetAllUsersUseCase } from '@/application/usecases/user/getAllUsersUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateUserUseCase, GetAllUsersUseCase],
})
export class HTTPModule {}
