import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('can create an instance of auth service', async () => {
  // create a fake copy of users service
  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };

  const module = await Test.createTestingModule({
    providers: [
      // providers는 모듈 내부에서 의존성 주입할 목록을 나타내고 있다
      AuthService, // AuthService가 의존하고 있는 UsersService가 필요해진다
      { provide: UsersService, useValue: fakeUsersService }, // UsersService를 providers에서 찾을거고, 그럼 UsersService 생성 요청이 왔을 때
      //fakeUsersService를 생성하라는  코드가 실행이 된다
    ],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
