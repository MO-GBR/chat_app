export const themeStore = (set) => ({
    theme: localStorage.getItem('theme-storage') || 'light',

    setTheme: (theme) => set({ theme })
});