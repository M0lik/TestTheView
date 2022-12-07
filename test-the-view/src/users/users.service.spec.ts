import { UsersService } from '../users/users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from './schemas/user.schema';

describe('AppService', () => {
  let service: UsersService;
  let mock;
  const param: User = { email: 'mail', password: 'password', _id: '' };
  const mockResult: User = param;

  beforeEach(() => {
    mock = {
      findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockResult),
      }),
    };
    service = new UsersService(mock);
  });

  describe('User Creation', () => {
    it('should detect an email colision', async () => {
      const localResult = new HttpException(
        'user already exists',
        HttpStatus.BAD_REQUEST,
      );

      await expect(service.create(param.email, param.password)).rejects.toThrow(
        localResult,
      );
    });
  });
});
