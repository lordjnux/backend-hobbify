import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import { auth } from 'express-openid-connect';
import { Auth0Config } from './config/auth0.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config({ path: './.env.development.local' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(auth(Auth0Config));

  const config = new DocumentBuilder()
    .setTitle('HOBBIFY API')
    .setDescription('The Hobbify API description')
    .setVersion('1.0')
    .addTag('hobbies')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
