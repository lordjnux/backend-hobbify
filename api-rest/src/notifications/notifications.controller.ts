import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  @Post('send')
  async sendNotification(
    @Body('token') token: string,
    @Body('title') title: string,
    @Body('body') body: string,
  ) {
    return this.firebaseAdminService.sendNotification(token, title, body);
  }
}

