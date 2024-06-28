import { Type } from "../enums/type.enum";

import mongoose, { Schema } from "mongoose";

import { IMessage } from "../interfaces/message.interface";


const messageSchema = new Schema<IMessage>({
    messageId: {type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId().toHexString()},
    dateTime: {type: Date, required: false},
    email: {type: String, required: true, unique: false},
    type: {type: String, enum: Object.values(Type), required: true},
    message: {type: String, required: true},
    reactions: {type: [String], default: []}
})


const messageModel = mongoose.model<IMessage>('Message', messageSchema)

export {messageModel, messageSchema}