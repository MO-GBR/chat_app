import { io } from "socket.io-client";

const baseUrl = import.meta.env.VITE_MODE === "development" ? import.meta.env.VITE_BASE_URL : "/";

export const authStore = (set, get) => ({
    currentUser: localStorage.getItem('user-storage') || null,
    isFetching: false,
    error: '',
    message: '',
    onlineUsers: [],
    socket: null,

    setMessage: (msg) => set({ message: msg }),

    setUser: (user, msg) => {
        set({ isFetching: true });
        try {
            set({currentUser: user, isFetching: false, message: msg });
            get().connectSocket();
        } catch (error) {
            console.log(error.message);
            set({error: error.message});
        };
    },

    addNewPrivateChat: (chatId) => {
        const { currentUser } = get();
        // const user = JSON.parse(currentUser);
        const chats = currentUser?.chats || [];

        if (!chats.includes(chatId)) {
            chats.push(chatId);
            set({ currentUser: { ...currentUser, chats: chats } });
        }
    },

    setUserWithoutSocket: (user) => set({ currentUser: user }),

    LogUserOut: () => {
        set({ isFetching: true });
        try {
            set({currentUser: null, isFetching: false});
            get().disconnectSocket();
        } catch (error) {
            console.log(error.message);
            set({error: error.message});
        };
    },

    connectSocket: () => {
        const { currentUser } = get();

        if(!currentUser || get().socket?.connected) return;

        const socket = io(baseUrl, {
            query: {
                userId: currentUser?.unique_id
            }
        });

        socket?.connect();

        set({ socket: socket });

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);

            socket.on("getOnlineUsers", (userIds) => {
                set({ onlineUsers: userIds });
            });
        });

        console.log("🧠 Zustand updated online users:", get().onlineUsers);
    },

    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket?.disconnect();
            set({ socket: null });
            console.log("Socket disconnected");
        }
    },
});