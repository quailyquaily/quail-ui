import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { QuailUI } from './index'
import HomeView from './app/home.vue'
import ArticleView from './app/article.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/article',
      name: 'article',
      component: ArticleView,
    }
  ]
});

const app = createApp(App)
app.use(QuailUI, {
  debug: true,
  useLayout: true,
  useSquircle: true,
})
app.use(router)
app.mount('#app')
