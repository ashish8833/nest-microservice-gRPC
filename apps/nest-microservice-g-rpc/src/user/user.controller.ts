import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Pagination,
  User,
  Users,
  UserServiceController,
  UserServiceControllerMethods,
} from 'apps/nest-microservice-g-rpc/assets/proto/user';
import { faker } from '@faker-js/faker';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController, OnModuleInit {
  users: User[];

  onModuleInit() {
    this.users = this.createRandomUser();
  }
  getUsers(request: Pagination): Users {
    const { page = 0, size = 10 } = request;

    const startIndex = page * size;
    const endIndex = (page + 1) * size;

    return {
      users: this.users.slice(startIndex, endIndex),
      total: this.users.length,
    };
  }

  createRandomUser(): User[] {
    const users: User[] = Array.from({ length: 100 }).map(() => ({
      uuid: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      gender: faker.person.gender(),
      addressFirstLine: faker.location.buildingNumber(),
      addressSecondLine: faker.location.secondaryAddress(),
      isActive: faker.datatype.boolean(),
    }));

    return users;
  }
}
