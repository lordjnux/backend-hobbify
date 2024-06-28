import { Injectable } from "@nestjs/common";
import { chatModel } from "./models/chat.model";
import { messageModel } from "./models/message.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IChat } from "./interfaces/chat.interface";
import { IMessage } from "./interfaces/message.interface";


@Injectable() 
export class MongodbRepository {
    constructor(
        @InjectModel('Chat') private readonly chatModel:Model<IChat>,
        @InjectModel('Message') private readonly messageModel:Model<IMessage>
    ) {}

    async createChat(id: string) {
        const newChatModel = new chatModel({
            userIdOwner: id,
        })
        try {
            return await newChatModel.save()
        } catch (error) {
            console.log(error);     
        }   
    }

    async newMessage(chatId, messageData:IMessage){

        messageData.dateTime = new Date();
        const newMessageModel = await this.messageModel.create(messageData)
     
        try {
            
            const updatedChat = await this.chatModel.findOneAndUpdate(
                { chatId },
                { $push: { messages: newMessageModel } },
                { new: true }
            ).populate('messages'); 
           
            
             return updatedChat;
            
        } catch (error) {
            console.log(error);
            
            
        }
    }
}
 