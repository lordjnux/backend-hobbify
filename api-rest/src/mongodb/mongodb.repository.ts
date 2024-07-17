import { Injectable } from "@nestjs/common";
import { chatModel } from "./models/chat.model";
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
            return await this.chatModel.create(newChatModel)
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

    async addReaction (messageId, reactions) {
        try {
            const addReaction = await this.messageModel.findOneAndUpdate( {messageId}, { $push: { reactions: reactions } }, { new: true })
            if (addReaction) {
                return {message: "Reaccion Agregada", addReaction}
            } else {
                return {message: "No se puede agregar la reaccion"}
            }
        } catch (error) {
            console.log(error);
            
            
        }
        

    }

    async getChats() {
        try {
            const chats = await this.chatModel.find().exec()
        return chats
        } catch (error) {
            console.log(error);
            
        }
        
        
        
    }

    async getChatMessages(chatId) {
        try {
            const chatMessages = await this.chatModel.findOne({chatId: chatId}).populate('messages')
            return chatMessages
        } catch (error) {
            console.log(error);
            
        }
        

    }

    async getUserMessages(email) {   
        try {
            const userMessages = await this.messageModel.find({email: email})
            return userMessages
        } catch (error) {
            console.log(error);
            
            
        }
       
        

    }

    async deleteChat(chatId) {

        try {
            const deletedChat = await this.chatModel.findOneAndDelete({chatId: chatId})
    if (deletedChat) {
        return {message: "Chat Eliminado", deletedChat}
        
    } else {
        return {message: "Chat no encontrado"}
    }
        } catch (error) {
            console.log(error);
            
        }
     
}

    async deleteMessage(messageId) {
        try {
            const deletedMessage = await this.messageModel.findOneAndDelete({messageId: messageId})
            if (deletedMessage) {
                return {message: "Message Eliminado", deletedMessage}
                
            } else {
                return {message: "Message no encontrado"}
            }
        } catch (error) {
            console.log(error);
            
            
        }
    }

    async putMessage(messageId, messageData) {
        try {
            const editMessage = await this.messageModel.findOneAndUpdate(
                { messageId },
                { $set: messageData },
                { new: true }
            )
            return editMessage
        } catch (error) {
            console.log(error);
            
        }
        
    }
}
 