import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let request: Request = context.switchToHttp().getRequest();
    let response: Response = context.switchToHttp().getResponse();
    let token = request.cookies?.jwt;
    let decoded;


    try {
      decoded = this.jwt.verify(token);
    } catch (error) {
      response.redirect("/auth/login")
    }

    response.locals.username = decoded.sub;

    return true;
  }
}
