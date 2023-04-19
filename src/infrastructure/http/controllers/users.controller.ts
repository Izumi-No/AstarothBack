import { Body, Controller, Injectable, Post } from '@nestjs/common';
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
    try {
      await this.createUser.execute({
        name: body.name,
        email: body.email,
        password: body.password,
        passwordConfirmation: body.passwordConfirmation,
      });

      return {
        message: 'User created successfully',
      };
    } catch (e) {
      console.log(e);
      return { message: e.message };
    }
  }
}
