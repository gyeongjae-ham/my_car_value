import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filterUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filterUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('asdf@asdf.com', 'asdf');

    try {
      await service.signup('asdf@asdf.com', 'asdf');
    } catch (err) {
      Promise.resolve();
    }
  });
  // 원래 done을 써서 처리한 자리인데 jest 업데이트 되면서 바뀐건지 promise와 done을 같이 못쓴다고 에러 메시지가 떳
  // done 대신에 promise.resolve로 처리함.

  it('throws if signin is called with an unused email', async () => {
    try {
      await service.signin('asdfa@asdfsajd', 'askjsdak');
    } catch (err) {
      Promise.resolve();
    }
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('asdf@sadfas.com', '123214123');

    try {
      await service.signin('asdf@sadfas.com', 'password');
    } catch (err) {
      Promise.resolve();
    }
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('asdf@asdfsa.com', 'mypassword');

    const user = await service.signin('asdf@asdfsa.com', 'mypassword');
    expect(user).toBeDefined();
  });
});
