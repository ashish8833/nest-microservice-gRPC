import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '../assets/proto/user';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../proto/user.proto'),
      loader: {
        includeDirs: [join(__dirname, '../proto')],
      },
      package: USER_PACKAGE_NAME,
      url: `localhost:50055`,
    },
  });

  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
