import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async create(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    return this.userModel.create({ email, password });
  }
}
