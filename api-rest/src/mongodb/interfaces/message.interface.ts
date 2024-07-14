import { Type } from "../enums/type.enum";

export interface IMessage extends Document{
    messageId: string;
    dateTime: Date;
    email: string;
    message: string;
    type: Type;
    reactions: string[];
}