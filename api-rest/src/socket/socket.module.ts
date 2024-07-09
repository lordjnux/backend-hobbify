import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';
import { SocketGateway } from './socket.gateway';

@Module({
  controllers: [SocketController],
  providers: [SocketService, SocketGateway],
})
export class SocketModule {}
