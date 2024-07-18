import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
// import { User } from 'src/user/entities/User.entity';
import { UsersEntity } from 'src/entities/users.entity';
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async addReaction(idMessage: string, reaction: string) {
    try {
      const chat = await this.chatRepository.findOneBy({ id: idMessage });

      if (!chat) throw new NotFoundException('Mensaje de chat no encontrado');

      chat.reaction = reaction;

      const chatReactionAdded = await this.chatRepository.save(chat);
      return chatReactionAdded;
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }

  async createMessage(
    userFrom: string,
    userTo: string,
    message: string,
  ): Promise<Chat> {
    const userFromExists = await this.userRepository.findOneBy({
      userId: userFrom,
    });
    const userToExists = await this.userRepository.findOneBy({
      userId: userTo,
    });
    if (!userFromExists || !userToExists) {
      console.log('User does not exist');
      return;
    }
    if (userFrom === userTo) {
      console.log('User cannot send message to self');
      return;
    }

    const chatMessage = this.chatRepository.create({
      message,
      from: userFromExists,
      to: userToExists,
    });
    console.log('********+PAYLOAD*************', chatMessage);

    return await this.chatRepository.save(chatMessage);
  }

  async getMessagesForClient(userFrom: string): Promise<Chat[]> {
    return await this.chatRepository.find({
      where: { from: { userId: userFrom } },
      order: { createdAt: 'ASC' },
    });
  }

  async getMssageForProfessional(userTo: string): Promise<Chat[]> {
    return await this.chatRepository.find({
      where: { to: { userId: userTo } },
      order: { createdAt: 'ASC' },
    });
  }

  async getMessagesForChat(userFrom: string, userTo: string): Promise<Chat[]> {
    const messages = await this.chatRepository.find({
      where: [
        { from: { userId: userFrom }, to: { userId: userTo } },
        { from: { userId: userTo }, to: { userId: userFrom } },
      ],
      order: { createdAt: 'ASC' },
      relations: ['from', 'to'],
    });

    return messages;
  }

  async getConctacts(userFrom: string): Promise<UsersEntity[]> {
    const user = await this.userRepository.findOne({
      where: { userId: userFrom },
      relations: ['contacts'],
    });
    console.log(user);
    if (!user) return [];
    if (!user.contacts) return [];
    return user.contacts;
  }
}
