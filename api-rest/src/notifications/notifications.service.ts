import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: './.env.development.local' });

@Injectable()
export class NotificationService {
  //create constructor and initialize firebase admin
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }

  //* trigger this method whenever a message is sent
  async sendNotification(
    token: string,
    payload: admin.messaging.MessagingPayload,
  ) {
    const message: admin.messaging.Message = {
      token,
      ...payload,
    };
    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
