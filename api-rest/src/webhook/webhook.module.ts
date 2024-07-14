import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { WebhookRepository } from './webhook.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { PaymentsEntity } from 'src/entities/payments.entity';
import { SuscriptionEntity } from 'src/entities/suscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, PaymentsEntity, SuscriptionEntity])],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookRepository],
})
export class WebhookModule {}
