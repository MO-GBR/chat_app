import { useAuth } from "..";

export const chatStore = (set, get) => ({
    messages: [],
    selectedUser: null,
    isMessagesLoading: false,
    error: '',

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    sendMessage: (message) => {
        const { messages } = get();
        set({ isMessagesLoading: true });
        try {
            set({ messages: [...messages, message], isMessagesLoading: false });
        } catch (error) {
            console.log(error.message);
            set({ error: error.message });
        };
    },

    setMessages: (messages) => {
        set({ isMessagesLoading: true });
        try {
            set({ messages, isMessagesLoading: false });
        } catch (error) {
            console.log(error.message);
            set({ error: error.message });
        };
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuth.getState().socket;

        socket?.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.sender_id === selectedUser.unique_id;
            if (!isMessageSentFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuth.getState().socket;
        socket?.off("newMessage");
    },
});