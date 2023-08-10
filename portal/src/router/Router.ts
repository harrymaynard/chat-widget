import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/Routes'
import AboutView from '@/views/AboutView.vue'
import ChatListView from '@/views/ChatListView.vue'
import ChatConversationView from '@/views/ChatConversationView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: routes.ABOUT_VIEW.name,
      path: routes.ABOUT_VIEW.path,
      component: AboutView,
    },
    {
      name: routes.CHAT_LIST_VIEW.name,
      path: routes.CHAT_LIST_VIEW.path,
      component: ChatListView,
    },
    {
      name: routes.CHAT_CONVERSATION_VIEW.name,
      path: routes.CHAT_CONVERSATION_VIEW.path,
      component: ChatConversationView,
    },
    {
      name: routes.LOGIN_VIEW.name,
      path: routes.LOGIN_VIEW.path,
      component: LoginView,
    },
  ]
})

export default router