import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { Follows } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import { UpdateFollowDto } from './dto/update-follow.dto';

@Injectable()
export class FollowsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { follower: User; following: User }) {
    console.log(data);
    let follows: Follows;
    try {
      follows = await this.prisma.follows.create({
        data: {
          follower: {
            connect: {
              id: data.follower.id,
            },
          },
          following: {
            connect: {
              id: data.following.id,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return {
        code: 201,
        message: `You are following ${data.following.username}`,
      };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot create follows',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  findAll() {
    return `This action returns all follows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} follow`;
  }

  update(id: number, updateFollowDto: UpdateFollowDto) {
    return `This action updates a #${id} follow`;
  }

  remove(id: number) {
    return `This action removes a #${id} follow`;
  }
}
