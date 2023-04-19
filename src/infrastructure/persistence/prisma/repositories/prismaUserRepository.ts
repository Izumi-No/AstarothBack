import { UserRepository } from '@/domain/repositories/userRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserEntity } from '@/domain/entities/User/user';
import { UserMapper } from '../mappers/userMapper';

Injectable();
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(user: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: await user.password.getHashedValue(),
      },
    });
    return;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return;
  }

  async find(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return UserMapper.toDomain(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return UserMapper.toDomain(user);
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return UserMapper.toDomain(user);
  }

  async exists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!user;
  }
}
