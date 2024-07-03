import { createApp } from 'vue'
import { createHead } from "unhead";
import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import './style.css'
import App from './App.vue'
import PageHome from './pages/PageHome.vue';
import PageItem from './pages/PageProduct.vue';
import PageCheckout from "./pages/PageCheckout.vue";

createHead();

const routes: RouteRecordRaw[] = [
  { path: "/", component: PageHome },
  { path: "/products/:productId", component: PageItem, props: true },
  { path: "/checkout", component: PageCheckout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app')
