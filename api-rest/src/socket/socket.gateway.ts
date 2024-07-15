import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
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
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatRoomsGateway');

  private clients: Map<string, string | string[]> = new Map();

  afterInit(server: Server) {
    this.logger.log('Initialized!');
    // console.log(server);
  }

  async handleConnection(client: Socket) {
    this.logger.debug('Client conected', client.id);

    const username = client.handshake.query.username;
    const hobbie = client.handshake.query.hobbie;

    console.log(username, hobbie);

    this.clients.set(client.id, username);

    this.server.emit('clients', Array.from(this.clients.values()));
  }

  async handleDisconnect(client: Socket) {
    this.logger.debug('Client disconected', client.id);
    this.clients.delete(client.id);
    this.server.emit('clients', Array.from(this.clients.values()));
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @MessageBody() targetUsername: string,
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = `room-${client.id}-${targetUsername}`;
    client.join(roomName);

    const targetClientId = [...this.clients].find(
      ([, username]) => username === targetUsername,
    )?.[0];

    if (targetClientId) {
      const targetClient = this.server.sockets.sockets.get(targetClientId);
      if (targetClient) {
        targetClient.join(roomName);
        targetClient.emit('roomJoined', roomName);
      }
    }
    client.emit('roomJoined', roomName);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { room: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.debug('Message', message);
    this.server.to(message.room).emit('message', {
      from: `(${this.clients.get(client.id)})`,
      content: message.content,
    });
  }
}
