import { Body, Controller, Get, NotFoundException, ParseIntPipe, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransfersService } from './transfers.service';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

@Controller('transfer')
export class TransfersController {
  constructor(private transfers: TransfersService, private users: UsersService) {}
  @Post()
  @UseGuards(AuthGuard)
  async makeTransfer(@Body("toUser") toUser: string, @Body("amount", ParseIntPipe) amount: number, @Res() response: Response){

    let recipient = await this.users.findUserByUsername(toUser)
    let donater = await this.users.findUserByUsername(response.locals.username)

    if (!donater || !recipient) {
      throw new NotFoundException("User not found")
    }
    await this.transfers.transferMoney(donater.id, recipient.id, amount)
    response.redirect("/dashboard")
  }

  @Get()
  @UseGuards()
  @Render("makeTransfer.hbs")
  transferPage(){}
}
