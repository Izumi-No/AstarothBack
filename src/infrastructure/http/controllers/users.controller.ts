import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/user/createUserDto';
import { CreateUserUseCase } from '@/application/usecases/user/createUserUseCase';
import { GetAllUsersUseCase } from '@/application/usecases/user/getAllUsersUseCase';
import { GetUserByIdUseCase } from '@/application/usecases/user/getUserByIdUseCase';
import { GetUserByEmailUseCase } from '@/application/usecases/user/getUserByEmailUseCase';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  @Get('/')
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

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'return user of specified id',
  })
  @ApiParam({ name: 'id', required: true })
  async getById(@Param('id') id: string) {
    try {
      const user = await this.getUserByIdUseCase.execute({ id });

      if (!user) {
        return { message: 'User not found' };
      }

      return user;
    } catch (e) {
      console.log(e);
      return { message: e.message };
    }
  }

  @Get('/email/:email')
  @ApiResponse({
    status: 200,
    description: 'return user of specified email',
  })
  async getByEmail(@Param('email') email: string) {
    try {
      const user = await this.getUserByEmailUseCase.execute({
        email: email,
      });

      if (!user) {
        return { message: 'User not found' };
      }

      return user;
    } catch (e) {
      console.log(e);
      return { message: e.message };
    }
  }

  @Post('/')
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
}
