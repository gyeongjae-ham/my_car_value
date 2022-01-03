import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // createUserDto의 instance가 생성되고 create 된 다음 save해야 데이터 베이스에 저장 됨

    return this.repo.save(user);
  }
}
