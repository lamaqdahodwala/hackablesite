import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  async createUser(username: string, password: string) {
    return await this.prisma.user.create({
      data: {
        username, 
        password
      }
    })
  }
  constructor(private prisma: PrismaService){}
  
  async findUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })
  }
  async findUserByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username: username
      }
    })
  }

  async userExists(username: string) {
    return !!(await this.findUserByUsername(username))
  }
}
