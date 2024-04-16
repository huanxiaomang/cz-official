import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import UpdateUserDto from './dto/updateUser.dto';

@Controller()
export class AuthController {
  constructor(private auth: AuthService) { }

  // @Post('register')
  // register(@Body() dto: RegisterDto) {
  //   return this.auth.register(dto);
  // }
  // @Post('login')
  // login(@Body() dto: LoginDto) {
  //   return this.auth.login(dto);
  // }
  // @Post('updateUserInfo')
  // updateUser(@Body() dto: UpdateUserDto) {
  //   return this.auth.updateUser(dto);
  // }
  @Get('')
  a() {
    return 'sb';
  }
}
