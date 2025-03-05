import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get("login")
  @Render("login")
  logIn(){}

  @Get("signUp")
  @Render("signup")
  signUp(){}

  @Post("getJWT")
  async getJWT(@Body("username") username: string, @Body("password") password: string, @Res() res: Response) {

    let token = await this.authService.logIn(username, password)
    console.log("gotten token")

    res.cookie("jwt", token)

    console.log("set header")

    res.redirect("/")

  }

  @Post("signUp")
  async createUserAccount(@Body("username") username: string, @Body("password") password: string, @Res() res: Response){
    await this.authService.signUp(username, password)
    console.log("signed up")
    await this.getJWT(username, password, res)
    console.log("set jwt")

    res.redirect("/")

  }


}
