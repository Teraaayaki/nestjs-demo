import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ profilePhoto, bio, ...createUserDto }: CreateUserDto) {
    const isEmailExisting = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (isEmailExisting) {
      throw new ConflictException('Email is already existing.');
    }

    await this.prisma.$transaction(async (transactionPrisma) => {
      const user = await transactionPrisma.user.create({
        data: { ...createUserDto },
      });

      await transactionPrisma.profile.create({
        data: { userId: user.id, photo: profilePhoto, bio },
      });
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        profile: { select: { photo: true, bio: true } },
        posts: { select: { title: true, content: true } },
      },
    });

    return { data: users };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return { data: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
