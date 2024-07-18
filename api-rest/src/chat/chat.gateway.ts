import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { AddMessageDto } from './dto/add-message.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer() server: Server = new Server();

  private logger = new Logger('ChatGateway');

  async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

  @SubscribeMessage('chat')
  async handleMessage(
    @MessageBody()
    payload: AddMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`from: ${payload.userFrom}`);
    this.logger.log(`to: ${payload.userTo}`);
    this.logger.log(`body: ${payload.message}`);

    const newMessage = await this.chatService.createMessage(
      payload.userFrom,
      payload.userTo,
      payload.message,
    );
    // quiero un evento general para todos los mensajes
    let messageEvent;
    if (payload.userTo > payload.userFrom)
      messageEvent = `chat_${payload.userFrom}_${payload.userTo}`;
    else messageEvent = `chat_${payload.userTo}_${payload.userFrom}`;

    this.server.emit(messageEvent, newMessage);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`${data.userFrom}_${data.userTo}`);
    this.logger.log(`Client joined room: `, data);
    const allMessages = await this.chatService.getMessagesForChat(
      data.userFrom,
      data.userTo,
    );
    client.emit('roomMessages', allMessages);
  }

  @SubscribeMessage('start')
  async handleGetContacts(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log("entro aca mi loco")
    const contacts = await this.chatService.getConctacts(data.userFrom);
    client.emit(`contacts_${data.userFrom}`, contacts);
  }
}
