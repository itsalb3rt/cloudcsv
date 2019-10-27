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
      authorizationRequired: false,
      pageTitle: 'Login'
    }
  },
  {
    path: '/auth/logout',
    name: 'logout',
    component: () => import('@/views/Auth/Logout.vue'),
    meta: {
      area: 'user',
      authorizationRequired: true,
      pageTitle: 'Logout'
    }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/views/Auth/Register.vue'),
    meta: {
      area: 'public',
      authorizationRequired: false,
      pageTitle: 'Register'
    }
  },
  {
    path: '/auth/recovery-account',
    name: 'recovery account',
    component: () => import('@/views/Auth/RecoveryAccount.vue'),
    meta: {
      area: 'public',
      authorizationRequired: false,
      pageTitle: 'Recovery Account'
    }
  },
  {
    path: '/auth/reset-password',
    name: 'reset password',
    component: () => import('@/views/Auth/ResetPassword.vue'),
    meta: {
      area: 'public',
      authorizationRequired: false,
      pageTitle: 'Recovery Account'
    }
  },
  {
    path: '/data/import',
    name: 'data import',
    component: () => import('@/views/Data/Import.vue'),
    meta: {
      area: 'user',
      authorizationRequired: true,
      pageTitle: i18n.t('pageTitles.dataImport')
    }
  },
  {
    path: '/data/export',
    name: 'data export',
    component: () => import('@/views/Data/Export.vue'),
    meta: {
      area: 'user',
      authorizationRequired: true,
      pageTitle: i18n.t('pageTitles.dataExport')
    }
  },
  {
    path: '/settings/main',
    name: 'settings main',
    component: () => import('@/views/Settings/Main.vue'),
    meta: {
      area: 'admin',
      authorizationRequired: true,
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

  if (to.meta.area === 'public') {
    if (token === null)
      next();
    else {
      next('/data/import');
    }
  } else {
    if (token === null)
      next('/auth/login');
    else {
      store.commit('auth/SET_LOGGED', true);
      store.commit('auth/SET_USER', JSON.parse(window.localStorage.getItem('user')));
      next();
    }
  }

})

export default router