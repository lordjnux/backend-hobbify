import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { WebhookRepository } from './webhook.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { PaymentsEntity } from 'src/entities/payments.entity';
import { SuscriptionEntity } from 'src/entities/suscription.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { strict } from 'assert';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
  

        return {
          transport: {
            service: 'gmail',
            secure: false,
            auth: {
              user: config.get('EMAIL_USER'),
              pass: config.get('EMAIL_PASSWORD'),
            },
          },
          defaults: {
            from: `No Reply <${config.get('EMAIL_FROM')}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UsersEntity, PaymentsEntity, SuscriptionEntity]),
  ],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookRepository],
})
export class WebhookModule {}
