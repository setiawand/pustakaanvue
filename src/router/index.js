import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";
import Login from '@/components/Login.vue'
import Layout from '@/components/Layout.vue';

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    localStorage.removeItem('token')
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Home.vue'),
        beforeEnter: ifAuthenticated
      }
    ]
  },
  {
    path: '/login', 
    component: Layout,
    beforeEnter: ifNotAuthenticated,
    children: [
      {
        path: '/login',
        name: 'Login', 
        component: Login,
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  routes
})