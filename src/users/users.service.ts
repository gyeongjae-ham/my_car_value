import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // createUserDto의 instance가 생성되고 create 된 다음 save해야 데이터 베이스에 저장 됨

    return this.repo.save(user); // return this.repo.save({email, password})로 하면 hook가 발생하지 않고, db에 객체는 생성됐지만 로그는 찍히지 않는다;;
  }

  findOne(id: number) {
    return this.repo.findOne({ id });
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs); // 객체에 해당하지 않은 속성들 다 제거됨
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }

  // save vs insert, update
  // save는 먼저 업데이트 하려는 객체를 findOne으로 찾고 save로 업데이트 한다(데이터 베이스를 두 번 들르게 됨)
  // insert, update는 데이터 베이스 한 번에 해결할 수 있음(but, hook이 작동하지 않음.)

  // remove vs delete
  // remove는 객체를 찾은 다음에 제거하고 저장한다(데이터 베이스 두 번 들르게 됨)
  // delete는 데이터 베이스 한 번에 해결할 수 있음(but, hook이 작동하지 않음.)
}
