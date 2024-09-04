import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Pagination,
  User,
  Users,
  UserServiceClient,
  UserServiceController,
  UserServiceControllerMethods,
} from 'apps/nest-microservice-g-rpc/assets/proto/user';
import { Observable } from 'rxjs';
import { faker } from '@faker-js/faker';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController, OnModuleInit {
  users: User[];

  onModuleInit() {
    this.users = this.createRandomUser();
  }
  getUsers(request: Pagination): Users {
    return {
      users: this.users,
    };
  }

  createRandomUser(): User[] {
    const users: User[] = Array.from({ length: 10 }).map(() => ({
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
