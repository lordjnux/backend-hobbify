import { Controller, Post } from '@nestjs/common';
import { NotificationService } from '../notifications/notifications.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  //! create messageDto
  async sendMessage(@Body() messageData: any) {
    const { message, recipientToken } = messageData;
    // Save the message to the database

    // Prepare the notification payload
    const payload = {
      notification: {
        title: 'New Message',
        body: message,
      },
    };

    // Send notification
    await this.notificationService.sendNotification(recipientToken, payload);
  }
}
