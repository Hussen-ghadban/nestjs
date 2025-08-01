import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: {username:string; email: string; password: string }) {
    return this.authService.signup(body.username,body.email, body.password);
  }

  @Post('signin')
  signin(@Body() body: { email: string; password: string }) {
    console.log("loggin in")
    return this.authService.signin(body.email, body.password);
  }

  @Get('get-user')
  @UseGuards(JwtAuthGuard)
  getuser(@Req() req){
    const userId = req.user.id;
    return this.authService.getuser(userId)
  }
}
