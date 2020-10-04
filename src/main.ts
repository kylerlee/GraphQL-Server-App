import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);

  // apply validation on all requests
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
  
}
bootstrap();
