const routes = [
  {
    path: "/",
    component: () => import("pages/public/MainApp.vue"),
    redirect: "/home",
    children: [
      {
        name: "acesso.home",
        path: "home",
        component: () => import("pages/public/Home/Home.vue"),
      },
      {
        name: "acesso.login",
        path: "logar",
        component: () => import("pages/public/Logar/Logar.vue"),
      },
      {
        name: "acesso.registrar",
        path: "registrar",
        component: () => import("pages/public/Registrar/Registrar.vue"),
      },
      {
        name: "acesso.perfil",
        path: "perfil",
        component: () => import("pages/public/Perfil/Perfil.vue"),
      },
      {
        name: "acesso.pacientes",
        path: "pacientes",
        component: () => import("pages/public/Pacientes/Pacientes.vue"),
      },
      {
        name: "acesso.sensor",
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

export default routes;
