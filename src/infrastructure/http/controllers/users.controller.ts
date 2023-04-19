import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/user/createUserDto';
import { createUserUseCase } from '@/application/usecases/user/createUserUseCase';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly createUser: createUserUseCase) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The notification has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() body: CreateUserDto) {
    await this.createUser.execute(body);
  }
}
