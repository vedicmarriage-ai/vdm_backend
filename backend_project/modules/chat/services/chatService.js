// Chat Service
const Chat = require('../model/chatModel');
module.exports = {
    sendMessage: async (user, messageData) => {
        const message = new Chat({ from_user: user._id, to_user: messageData.to_user, message: messageData.message });
        return await message.save();
    }
};