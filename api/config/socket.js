export const userSocketMap = {};

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
};

export const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log("🔌 New user connected:", socket.id);
    
        const userId = socket.handshake.query.userId;
    
        if (userId) {
            userSocketMap[userId] = socket.id;
            console.log(`User ${userId} connected with socket ID: ${socket.id}`);
        };

        const onlineUsersMap = Object.keys(userSocketMap);
    
        io.emit('getOnlineUsers', onlineUsersMap);
    
        socket.on('disconnect', () => {
            console.log("❌ User disconnected:", socket.id);
            delete userSocketMap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        });
    });
};

export const sendMessageIO = (receiverId, io, message) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    console.log('>>>', receiverSocketId, receiverId, message);
    console.log('userSocketMap', userSocketMap);
    
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', message);
        console.log(`Message sent 📨 to user ${receiverId} with socket ID: ${receiverSocketId}`);
    } else {
        console.log(`User ${receiverId} is not online.`);
    }
};