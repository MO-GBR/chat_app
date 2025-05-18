import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { themeStore } from './Stores/ThemeStore';
import { authStore } from './Stores/AuthStore';
import { chatStore } from './Stores/ChatStore';

// Tools
const themeTools = persist(
    devtools(themeStore),
    {
        name: 'theme-storage'
    }
);

const authTools = persist(
    devtools(authStore),
    {
        name: 'user-storage',
        partialize: (state) => {
            const { socket, message, isFetching, ...rest } = state;
            return rest;
        }
    }
);

const chatTools = persist(
    devtools(chatStore),
    {
        name: 'chat-storage'
    }
);

// Use Stores
export const useTheme = create(themeTools);

export const useAuth = create(authTools);

export const useChat = create(chatTools);
