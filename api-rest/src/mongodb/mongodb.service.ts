import { Injectable } from '@nestjs/common';
import { MongodbRepository } from './mongodb.repository';
import { IMessage } from './interfaces/message.interface';

@Injectable()
export class MongodbService {
  constructor(private readonly mongodbRepository: MongodbRepository) {}

  newMessage(chatId, messageData:IMessage) {
    return this.mongodbRepository.newMessage(chatId,messageData)
  }
  createChat(id: string)  {
    return this.mongodbRepository.createChat(id)
  }

  findAll() {
    return `This action returns all mongodb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mongodb`;
  }

  update(id: number, updateMongodbDto: any) {
    return `This action updates a #${id} mongodb`;
  }

  remove(id: number) {
    return `This action removes a #${id} mongodb`;
  }
}
