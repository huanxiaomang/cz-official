import { Body, Controller, Get, Headers, Param, Patch, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import UpdateUserDto from './dto/updateUser.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import { SendVerificationCodeDto, VerifyCodeDto } from './dto/verification-code.dto';
import { Admin, Auth } from './decorators/auth.decorator';
import { VerificationCodeService } from './verification-code.service';
import AdminUpdateUserDto from './dto/admin-update-user.dto';
import AdminQueryMembersDto from './dto/admin-query-members.dto';

import { CurrentUser } from './decorators/user.decorator';

@Controller()
export class AuthController {
  constructor(
    private auth: AuthService,
    private verificationCodeService: VerificationCodeService
  ) { }

  @Get('cz')
  getCZMembers() {
    return this.auth.getCZMembers();
  }

  @Get('all')
  getAllMembers() {
    return this.auth.getAllMembers();
  }

  @Admin()
  @Get('admin/users')
  getAdminMembers(@Query() dto: AdminQueryMembersDto) {
    return this.auth.getAdminMembers(dto);
  }

  @Admin()
  @Get('admin/user-options')
  getAdminUserOptions() {
    return this.auth.getAdminUserOptions();
  }

  @Get('getUserInfo/:userId')
  getUserInfo(@Param('userId') userId) {
    return this.auth.getUserInfo(userId);
  }

  @Admin()
  @Patch('admin/users/:userId')
  setUserRole(@Param('userId') userId, @Body() dto: AdminUpdateUserDto) {
    return this.auth.setUserRole(userId, dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Admin()
  @Post('generate-invitation')
  generateInvitation(@Body() body: { maxUses?: number, expireDays?: number }, @CurrentUser() user) {
    return this.auth.generateInvitationCode(user.userId, body.maxUses || 1, body.expireDays || 7);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Auth()
  @Post('updateUserInfo')
  updateUser(@Body() dto: UpdateUserDto, @Headers('authorization') authorization: string) {
    const token = authorization.split(' ')[1];
    return this.auth.updateUser(dto, token);
  }

  @Post('send-reset-code')
  async sendResetCode(@Body() dto: SendVerificationCodeDto) {
    await this.verificationCodeService.sendVerificationCode(dto.email, 'password_reset');
    return { message: '验证码已发送至邮箱，有效期5分钟' };
  }

  @Post('verify-code')
  async verifyCode(@Body() dto: VerifyCodeDto) {
    const isValid = await this.verificationCodeService.verifyCode(dto.email, dto.code, dto.type);
    return { valid: isValid, message: '验证码验证成功' };
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.auth.resetPassword(dto);
    return { message: '密码重置成功' };
  }
}
