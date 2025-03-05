import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {hash} from 'node:crypto'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService){}

  async verifyPasswordForUser(password: string, userId: number){
    let hashedPassword = hash("sha256", password)
    let user = await this.users.findUserById(userId)

    return hashedPassword === user?.password
  }

  async verifyPasswordForUserWithUsername(password: string, username: string) {
    let hashedPassword = hash("sha256", password)
    let user = await this.users.findUserByUsername(username)
    return hashedPassword === user?.password
  }

  generateHashForPassword(password: string) {
    return hash('sha256', password)
  }

  async logIn(username: string, password: string) {
    if ( !(await this.users.userExists(username)) ) {
      throw new NotFoundException("User not found, sign up for an account first")
    }

    let passwordCorrect = this.verifyPasswordForUserWithUsername(password, username)

    if (!passwordCorrect) {
      throw new UnauthorizedException("Incorrect password")
    }

    const payload = {sub: username}

    return await this.jwt.signAsync(payload)
  }

  async signUp(username: string, password: string) {
    let hashedPassword = this.generateHashForPassword(password)

    await this.users.createUser(username, hashedPassword)
  }

}
