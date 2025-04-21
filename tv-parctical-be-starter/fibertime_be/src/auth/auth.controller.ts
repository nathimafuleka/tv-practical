import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  async requestOtp(@Body() body: { cell_number: string }): Promise<void> {
    return this.authService.requestOtp(body.cell_number);
  }

  @Post('login')
  async login(
    @Body() body: { cell_number: string; otp: string },
  ): Promise<{ token: string; user: { id: string; cell_number: string; name: string } }> {
    return this.authService.login(body.cell_number, body.otp);
  }
}
