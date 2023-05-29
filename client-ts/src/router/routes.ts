import { RouteConfig } from 'vue-router';
import { NavigationGuardNext, Route } from 'vue-router/types/router';
import StorageUtils from 'src/common/utils/StorageUtils';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'public',
    component: () => import('pages/MainApp.vue'),
    children: [
      {
        path: '',
        name: 'public',
        component: () => import('pages/public/PublicApp.vue'),
        redirect: '/home',
        children: [
          {
            name: 'public.home',
            path: 'home',
            component: () => import('pages/public/home/HomePage.vue'),
          },
          {
            name: 'public.login',
            path: 'login',
            component: () => import('pages/public/login/LoginPage.vue'),
          },
          {
            name: 'public.register',
            path: 'register',
            component: () => import('pages/public/register/RegisterPage.vue'),
          },
        ],
      },
      {
        path: '',
        name: 'private',
        component: () => import('pages/private/PrivateApp.vue'),
        redirect: '/dash',
        children: [
          {
            name: 'private.dash',
            path: 'dash',
            component: () => import('pages/private/dash/DashPage.vue'),
            meta: { requiresAuth: true },
          },
          {
            name: 'private.patient',
            path: 'patients',
            component: () => import('pages/private/patients/PatientsPage.vue'),
            meta: { requiresAuth: true },
          },
          {
            name: 'private.profile',
            path: 'profile',
            component: () => import('pages/private/account/AccountPage.vue'),
            meta: { requiresAuth: true },
          },
          {
            name: 'private.session',
            path: 'session/:id',
            component: () => import('pages/private/session/SessionPage.vue'),
            meta: { requiresAuth: true },
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/public/not-found/NotFound.vue'),
  },
];

async function RouteBeforeGuard(
  to: Route,
  from: Route,
  next: NavigationGuardNext
) {
  // TODO public granted without authentication
  const publicReleased = ['public.login', 'public.register', 'public.home'];
  // TODO Hide when logged
  const blockWhenLogged = ['public.login', 'public.register', 'public.home'];
  const token = await StorageUtils.getToken();
  const isLoggedIn = !!token;
  if (to?.name === from?.name) {
    return;
  }
  if (isLoggedIn) {
    if (blockWhenLogged.includes(<string>to?.name)) {
      next({
        name: 'private.dash',
      });
    } else {
      next();
    }
  }
  if (!isLoggedIn) {
    if (publicReleased.includes(<string>to?.name)) {
      next();
    } else {
      next({
        name: 'public.home',
      });
    }
  }
}

export { routes, RouteBeforeGuard };
