import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InfoService {
  constructor(private prisma: PrismaService) {}

  async createArticle(title: string, content: string) {
    return await this.prisma.article.create({
      data: {
        title,
        content,
      },
    });
  }

  async getRecentArticles(amount: number = 3) {
    return await this.prisma.article.findMany({
      take: amount,
      orderBy: {
        id: 'desc',
      },
    });
  }
}
