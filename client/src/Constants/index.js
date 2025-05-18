export const THEMES = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
    'caramellatte',
    'abyss',
    'silk',
];

export const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: false },
    { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

export const SETTING = [
    {
        icon: '/icons/chat.svg',
        text: 'Home',
        href: '/'
    },
    {
        icon: '/icons/search.svg',
        text: 'Search',
        href: '/search'
    },
    {
        icon: '/icons/themes.svg',
        text: 'Themes',
        href: '/themes'
    },
    {
        icon: '/icons/edit.svg',
        text: 'Edit Your Profile',
        href: '/edit-profile'
    },
    {
        icon: '/icons/user.svg',
        text: 'Profile',
        href: '/profile'
    },
    {
        icon: '/icons/login.svg',
        text: 'Log Out',
        href: '#'
    },
];

export const fakeUser = {
    unique_id: "123456789",
    username: "John Doe",
    email: "email@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user_image: "https://avatar.iran.liara.run/public/boy",
    is_active: true,
};