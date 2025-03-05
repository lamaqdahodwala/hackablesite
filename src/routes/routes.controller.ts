import { Controller, Get, Render, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { InfoService } from 'src/info/info.service';
import { UsersService } from 'src/users/users.service';

@Controller()
export class RoutesController {
  constructor(private info: InfoService, private users: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  homePage(@Res() res: Response) {
    if (res.locals.username) {
      res.redirect("dashboard")
    }
    res.render("index")
    // return {message: "message"}
  }

  @Get('/dashboard')
  @UseGuards(AuthGuard)
  @Render("dashboard")
  async dashboard(@Res() res: Response) {
    let username: string = res.locals.username
    let user = await this.users.findUserByUsername(username)
    let balance = user?.balance
    let recentArticles = await this.info.getRecentArticles()


    return {
      username, 
      balance, 
      newsArticles: recentArticles,
      isAdmin: user?.role === "admin"
    }
  }
}


