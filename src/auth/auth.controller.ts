import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    const { username, email, password } = body;
    try {
      const { user, token } = await this.authService.register(
        username,
        email,
        password,
      );
      return { status: 'OK', user, token };
    } catch (error) {
      return { status: 'Error', message: error.message };
    }
  }

  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;
    try {
      const { user, token } = await this.authService.login(email, password);
      return { status: 'OK', user, token };
    } catch (error) {
      return { status: 'Error', message: error.message };
    }
  }
}
