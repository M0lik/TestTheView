import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('UnrestrictedHelloWorld')
  getUnrestrictedHello() {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('RestrictedHelloWorld')
  getRestrictedHello() {
    return this.appService.getHello();
  }
}
