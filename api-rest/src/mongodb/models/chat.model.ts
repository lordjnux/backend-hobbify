import mongoose, { Schema } from "mongoose"
import { IChat } from "../interfaces/chat.interface"


const chatSchema = new Schema<IChat>({
    chatId: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId().toHexString() }, 
    userIdOwner: { type: String, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message', default: [] }]
}, {versionKey: false});

const chatModel = mongoose.model<IChat>('Chat', chatSchema)

export {chatModel, chatSchema}