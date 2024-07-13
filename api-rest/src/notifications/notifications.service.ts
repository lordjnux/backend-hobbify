import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

@Injectable()
export class NotificationService {
  private readonly expo: Expo;

  constructor() {
    this.expo = new Expo();
  }

  async sendNotification(token: string, title: string, body: string) {
    if (!Expo.isExpoPushToken(token)) {
      throw new UnauthorizedException('Token no válido');
    }

    const message: ExpoPushMessage = {
      to: token,
      sound: 'default',
      title: title,
      body: body,
      data: { withSome: 'data' },
    };

    try {
      const ticketChunk = await this.expo.sendPushNotificationsAsync([message]);
      return ticketChunk;
    } catch (error) {
      throw error;
    }
  }
}
