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

  addReaction(messageId, reactions) {
    return this.mongodbRepository.addReaction(messageId, reactions)
  }

  getChats() {
    return this.mongodbRepository.getChats();
  }

  getChatMessages(chatId) {
    return this.mongodbRepository.getChatMessages(chatId)

  }

  getUserMessages(email) {
    return this.mongodbRepository.getUserMessages(email)

  }

  deleteChat(chatId) {
    return this.mongodbRepository.deleteChat(chatId)

  }

 deleteMessage(messageId) {
       return this.mongodbRepository.deleteMessage(messageId)
  }

 putMessage(messageId, messageData) {
       return this.mongodbRepository.putMessage(messageId, messageData)
  }
}
