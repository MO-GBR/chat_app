import { Message } from "../../database/models/Message.js";
import { ErrorResponse } from "../../utils/HandleResponse.js";
import cloudinary from '../../utils/HandleUpload.js';
import { sendMessageIO } from '../../config/socket.js';
import { io } from "../../server.js";

export const MessageResolver = {
    Query: {
        getMessages: async ( parent, args, context, info ) => {
            const { myId, chatId } = args;

            try {
                const findMyMessages = {
                    sender_id: myId,
                    receiver_id: chatId
                };

                const findChatMessages = {
                    sender_id: chatId,
                    receiver_id: myId
                };

                const myMessages = await Message.findBy('messages', findMyMessages);
                const chatMessages = await Message.findBy('messages', findChatMessages);

                return {
                    myMessages: myMessages ? myMessages : [],
                    chatMessages: chatMessages ? chatMessages : []
                };
            } catch (error) {
                const err = new ErrorResponse(`Error fetching Get Messages resolver: ${error.message}`, 500);
                console.error(err);
            }
        }
    },

    Mutation: {
        sendMessage: async ( parent, args, context, info ) => {
            const { sender_id, receiver_id, text, image } = args.input;

            try {
                const img = image ? (await cloudinary.uploader.upload(image)).secure_url : null;

                const message = new Message(sender_id, receiver_id, text, img);
                const savedMessage = await message.save('messages');

                sendMessageIO(receiver_id, io, savedMessage);
                
                return savedMessage;
            } catch (error) {
                const err = new ErrorResponse(`Error fetching Send Message resolver: ${error.message}`, 500);
                console.error(err);
            };
        }
    }
}