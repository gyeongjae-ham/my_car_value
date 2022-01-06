import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

it('can create an instance of auth service', async () => {
  // create a fake copy of users service
  const fakeUsersService: Partial<UsersService> = {
    // fake userService instance를 만들기 위해서 typescript의 도움을 받기 위해 타입을
    // UsersService로 지정해 주는데, authService에 해당하는 userService만 구현하기 위해서 Partial 부분을 작성해서 부분 작성이라는 것을 표시해준다
    // create method는 원래 User 객체를 반환해야 하는데 Dto에 보면 로그를 남기는 부분이 있어서 에러가 발생한다 테스트 할 때 로그까지 구현하고 싶지 않기 때문에
    // 객체를 as User로 받아서 객체를 반환하는 것처럼 속여서 작성한다
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User),
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
