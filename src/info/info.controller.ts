import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { InfoService } from './info.service';
import { UsersService } from 'src/users/users.service';

@Controller('article')
export class InfoController {
  constructor(private info: InfoService, private users: UsersService) {}
  @Post("create")
  @UseGuards(AuthGuard)
  async createArticle(@Body('title') title: string, @Body('content') content: string,@Res() res: Response) {
    let username = (res.locals.username)
    let user = await this.users.findUserByUsername(username)

    if (user?.role !== "admin") {
      res.redirect("/login")
    }

    await this.info.createArticle(title, content)

    res.redirect("/dashboard")
  }
}
