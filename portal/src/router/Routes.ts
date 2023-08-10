export const routes = {
  ABOUT_VIEW: {
    name: 'AboutView',
    path: '/about',
    title: 'About',
  },
  LOGIN_VIEW: {
    name: 'LoginView',
    path: '/',
    title: 'Login'
  },
  CHAT_LIST_VIEW: {
    name: 'SessionListView',
    path: '/chats',
    title: 'Open Chat Sessions'
  },
  CHAT_CONVERSATION_VIEW: {
    name: 'ChatView',
    path: '/chat/:chatId',
    title: 'Chat'
  },
}
