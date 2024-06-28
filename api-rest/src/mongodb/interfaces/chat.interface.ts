import { IMessage } from "./message.interface";

export interface IChat extends Document {
    chatId: string;
    userIdOwner: string;
    messages: IMessage[];
}