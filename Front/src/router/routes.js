import AuthenticationUtils from "src/commons/utils/AuthenticationUtils";

export const routes = [
  {
    path: "/",
    component: () => import("pages/MainApp.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/public/PublicApp.vue"),
        redirect: "/home",
        children: [
          {
            name: "access.home",
            path: "home",
            component: () => import("pages/public/Home/Home.vue"),
          },
          /*{
            name: "access.settings",
            path: "settings",
            component: () =>
              import("pages/public/Configuration/Configuration.vue"),
          },*/
          {
            name: "access.login",
            path: "login",
            component: () => import("pages/public/Login/Login.vue"),
          },
          {
            name: "access.register",
            path: "register",
            component: () => import("pages/public/Register/Register.vue"),
          },
          {
            name: "access.socket",
            path: "socket",
            component: () => import("pages/public/SocketTest/SocketTest.vue"),
          },
        ],
      },
      {
        path: "/",
        component: () => import("pages/private/PrivateApp.vue"),
        redirect: "/profile",
        children: [
          {
            name: "private.patient",
            path: "patients",
            component: () => import("pages/private/Patients/Patients.vue"),
          },
          {
            name: "private.profile",
            path: "profile",
            component: () => import("pages/private/Account/Account.vue"),
          },
          {
            name: "private.session",
            path: "session",
            component: () => import("pages/private/Session/Session.vue"),
          },
        ],
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/public/Error/Error404.vue"),
  },
];

export const RouteBeforeGuard = async (to, from, next) => {
  // TODO Access granted without authentication
  let accessReleased = [
    "access.login",
    "access.register",
    "access.home",
    "access.socket",
  ];
  // TODO Hide when logged
  let hideWhenLogged = ["access.login", "access.register"];
  let token = AuthenticationUtils.getToken();
  let isLoggedIn = !!token;

  if (to.name === from.name) {
    return;
  }

  if (isLoggedIn) {
    if (hideWhenLogged.includes(to.name)) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    if (accessReleased.includes(to.name)) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  }
};
