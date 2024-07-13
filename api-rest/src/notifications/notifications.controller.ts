import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NotificationsDto } from 'src/dtos/notifications.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('save')
  async saveToken(@Body() token: string) {
    // Guarda el token en tu base de datos si es necesario
    console.log('Token recibido:', token);
  }

  @Post('send')
  async sendNotification(@Body() notification: NotificationsDto) {
    const { token, title, body } = notification;
    return await this.notificationService.sendNotification(token, title, body);
  }
}
