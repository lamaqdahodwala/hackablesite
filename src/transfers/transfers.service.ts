import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransfersService {
  constructor(private prisma: PrismaService) {}

  async transferMoney(fromUserId: number, toUserId: number, amount: number) {
    await this.prisma.user.update({
      where: {
        id: fromUserId
      },
      data: {
        balance: {
          decrement: amount
        }
      }
    })

    await this.prisma.user.update({
      where: {
        id: toUserId
      },
      data: {
        balance: {
          increment: amount
        }
      }
    })

    return
  }
}
