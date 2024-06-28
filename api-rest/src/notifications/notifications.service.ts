import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  async sendPushNotification(token: string, message: string, title: string) {
    const payload = {
      notification: {
        title: title,
        body: message,
      },
    };

    try {
      await this.firebaseAdmin.messaging().sendToDevice(token, payload);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
}
