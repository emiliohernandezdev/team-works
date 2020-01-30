import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const config: ConfigService = new ConfigService();
  const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    app.use(helmet());
    app.enableCors();
    app.use(compression());
  await app.listen(config.get<number>('PORT'))
}
bootstrap();
