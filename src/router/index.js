import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '@/i18n';
import store from '@/store/index';

Vue.use(VueRouter)

const routes = [{
    path: '*',
    redirect: '/auth/login'
  },
  {
    path: '/',
    redirect: '/auth/login'
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: {
      area: 'public',
      pageTitle: 'Login'
    }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/views/Auth/Register.vue'),
    meta: {
      area: 'public',
      pageTitle: 'Register'
    }
  },
  {
    path: '/auth/recovery-account',
    name: 'recovery account',
    component: () => import('@/views/Auth/RecoveryAccount.vue'),
    meta: {
      area: 'public',
      pageTitle: 'Recovery Account'
    }
  },
  {
    path: '/auth/reset-password',
    name: 'reset password',
    component: () => import('@/views/Auth/ResetPassword.vue'),
    meta: {
      area: 'public',
      pageTitle: 'Recovery Account'
    }
  },
  {
    path: '/data/import',
    name: 'data import',
    component: () => import('@/views/Data/Import.vue'),
    meta: {
      area: 'public',
      pageTitle: i18n.t('pageTitles.dataImport')
    }
  },
  {
    path: '/settings/main',
    name: 'settings main',
    component: () => import('@/views/Settings/Main.vue'),
    meta: {
      area: 'public',
      pageTitle: i18n.t('pageTitles.settings')
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.pageTitle;
  const token = window.localStorage.getItem('token');

  if (token === null) {
    next('/auth/login');
  } else {
    store.commit('auth/SET_LOGGED',true);
    store.commit('auth/SET_USER',JSON.parse(window.localStorage.getItem('user')));
    next();
  }

})

export default router