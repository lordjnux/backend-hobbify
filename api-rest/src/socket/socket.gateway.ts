import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { config as dotenvConfig } from 'dotenv';
import { Server, Socket } from 'socket.io';

dotenvConfig({ path: './.env.development.local' });

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  afterInit(server: any) {
    // :',
    //   server.opts,
    //   server.clientsCount,
    //   server.cllients,
    // );
  }

  handleConnection(client: any, ...args: any[]) {
    console.info('Client connected...');
    //
    //
  }

  handleDisconnect(client: any) {
    console.warn('Client disconnected...');
    //
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, room: 'string') {
    console.warn('Client join-room...');

    client.join(`room-${room}`);
  }

  @SubscribeMessage('message-sent')
  handleIncomminMessage(
    client: Socket,
    payload: { room: string; message: string },
  ) {
    console.warn('server:message-sent...');

    this.server.emit('newMessage', payload);
  }

  @SubscribeMessage('room-leave')
  handleRoomLeave(client: Socket, room: string) {
    console.warn('Client room-leave...');
    //
    //
    // client.leave(`room-${room}`);
  }
}
