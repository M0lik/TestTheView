import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: LoginDto): Promise<User> {
    const userFromDb = await this.usersService.findByEmail(user.email);
    if (!userFromDb) return null;

    const valid = await bcrypt.compare(user.password, userFromDb.password);
    return valid ? userFromDb : null;
  }

  async login(user: LoginDto) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: LoginDto): Promise<UserResponseDto> {
    const userFromDb: User = await this.usersService.create(
      user.email,
      user.password,
    );
    return new UserResponseDto(userFromDb.email, userFromDb._id);
  }
}
