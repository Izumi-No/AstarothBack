import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/user/createUserDto';
import { CreateUserUseCase } from '@/application/usecases/user/createUserUseCase';
import { GetAllUsersUseCase } from '@/application/usecases/user/getAllUsersUseCase';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUsersUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The User has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() body: CreateUserDto) {
    try {
      await this.createUserUseCase.execute({
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

  @Get()
  @ApiResponse({
    status: 200,
    description: 'return all users',
  })
  async getAll() {
    try {
      const users = await this.getAllUserUseCase.execute({});

      return users;
    } catch (e) {
      console.log(e);
      return { message: e.message };
    }
  }
}
