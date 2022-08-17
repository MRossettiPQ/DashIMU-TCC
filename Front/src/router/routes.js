import AutenticacaoUtils from 'src/commons/utils/AutenticacaoUtils';

export const routes = [
  {
    path: "/",
    component: () => import("pages/public/MainApp.vue"),
    redirect: "/home",
    children: [
      {
        name: "access.home",
        path: "home",
        component: () => import("pages/public/Home/Home.vue"),
      },
      {
        name: "access.login",
        path: "login",
        component: () => import("pages/public/Logar/Logar.vue"),
      },
      {
        name: "access.registrar",
        path: "register",
        component: () => import("pages/public/Registrar/Registrar.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("pages/public/MainApp.vue"),
    redirect: "/home",
    children: [
      {
        name: "access.perfil",
        path: "perfil",
        component: () => import("pages/public/Perfil/Perfil.vue"),
      },
      {
        name: "access.pacientes",
        path: "pacientes",
        component: () => import("pages/public/Pacientes/Pacientes.vue"),
      },
      {
        name: "access.sensor",
        path: "sensor",
        component: () => import("pages/public/Sensor/Sensor.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export const RouteBeforeGuard = async (to, from, next) => {
  // TODO Access granted without authentication
  let accessReleased = ["access.login", "access.register", "access.home"];
  // TODO Hide when logged
  let hideWhenLogged = ["access.login", "access.register"];

  let token = AutenticacaoUtils.getToken();
  let isLoggedIn = !!token;

  if(isLoggedIn) {
    if (hideWhenLogged.includes(to.name)) {
      next({
        path: "/",
      });
      return;
    }
    next();
  }
 else {
    if (accessReleased.includes(to.name)) {
      next();
      return;
    }
 else {
      next({
        path: '/login'
      });
      return;
    }
  }
  next();
};

export default {routes, RouteBeforeGuard};
