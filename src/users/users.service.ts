import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { wait } from '../lib/utilities/wait';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {

    const key = 'users-find-all';
    const usersCached = await this.cacheManager.get(key);


    if (usersCached)
      return usersCached;

    const users = [
      {
        id: 1,
        name: 'kazte'
      },
      {
        id: 2,
        name: 'pepe'
      },
    ];

    await wait(3000);
    await this.cacheManager.set(key, users, 1000 * 10);
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
