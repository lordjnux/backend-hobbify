import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notifications.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationService],
})
export class NotificationsModule {}
