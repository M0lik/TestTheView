import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';

describe('AppService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  const param_mail = 'a@aa.aa';
  const param_password = 'password';
  const user: User = { email: param_mail, password: param_password, _id: '' };

  beforeEach(() => {
    userService = new UsersService(null);
    jwtService = new JwtService();
    service = new AuthService(userService, jwtService);
  });

  describe('User Validation', () => {
    it('should validate the user', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

      await expect(
        service.validateUser({ email: param_mail, password: param_password }),
      ).resolves.toBe(user);
    });

    it('should not found the user', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(undefined);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

      await expect(
        service.validateUser({ email: param_mail, password: param_password }),
      ).resolves.toBe(null);
    });

    it('should found the user but fail the password check', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

      await expect(
        service.validateUser({ email: param_mail, password: param_password }),
      ).resolves.toBe(null);
    });
  });
});
