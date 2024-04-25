import { Body, Controller, Get, Post, Headers, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import UpdateUserDto from './dto/updateUser.dto';
import { Admin, Auth } from './decorators/auth.decorator';

@Controller()
export class AuthController {
  constructor(private auth: AuthService) { }

  @Get('cz')
  getCZMembers() {
    return this.auth.getCZMembers();
    }
    @Get('all')
    getAllMembers() {
        return this.auth.getAllMembers();
    }
    
  @Get('getUserInfo/:userId')
  getUserInfo(@Param('userId') userId ) {
    return this.auth.getUserInfo(userId);
    }

    @Admin()
    @Get('setUserRole/:userId')
    setUserRole(@Param('userId') userId,@Query('role') role: string) {
        return this.auth.setUserRole(userId,role);
    }
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }
  @Auth()
  @Post('updateUserInfo')
  updateUser(@Body() dto: UpdateUserDto, @Headers('authorization') authorization: string) {
    const token = authorization.replace('Bearer ', '');
    return this.auth.updateUser(dto, token);
  }
}
