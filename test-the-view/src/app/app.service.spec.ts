import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  describe('Call getHello', () => {
    it('should return Hello World string', () => {
      const result = 'Hello World!';
      expect(service.getHello()).toBe(result);
    });
  });
});
