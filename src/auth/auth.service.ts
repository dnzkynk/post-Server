import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<{ user: AuthDocument; token: string }> {
    const existingUser = await this.authModel.findOne({ email });

    if (existingUser) {
      throw new Error('Bu email adresi ile zaten bir hesap bulunuyor!');
    }

    if (password.length < 6) {
      throw new Error('Şifre en az 6 karakter olmalıdır');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (!this.validateEmail(email)) {
      throw new Error('Geçersiz email adresi');
    }

    const newUser = await this.authModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: newUser._id });
    return { user: newUser, token };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: AuthDocument; token: string }> {
    const user = await this.authModel.findOne({ email });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Geçersiz şifre');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { user, token };
  }

  private validateEmail(email: string): boolean {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  }
}
