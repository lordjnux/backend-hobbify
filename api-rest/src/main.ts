import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import { auth } from 'express-openid-connect';
import { Auth0Config } from './config/auth0.config';
import { mongoConnect } from './config/mongodb.config';
dotenv.config({ path: './.env.development.local' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(auth(Auth0Config));

  mongoConnect().then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.log(err);
  });

  await app.listen(process.env.PORT);
}
bootstrap();
