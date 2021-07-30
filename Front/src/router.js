import { createWebHistory, createRouter } from "vue-router";
import Home     from "./components/Home.vue";
import Login    from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile         = () => import("./components/Profile.vue")
const BoardAdmin      = () => import("./components/BoardAdmin.vue")
const BoardPaciente   = () => import("./components/BoardPaciente.vue")
const BoardFisio      = () => import("./components/BoardFisio.vue")
const BoardSensor     = () => import("./components/BoardSensor.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/paciente",
    name: "paciente",
    // lazy-loaded
    component: BoardPaciente,
  },
  {
    path: "/fisio",
    name: "fisio",
    // lazy-loaded
    component: BoardFisio,
  },
  {
    path: "/leitura-sensor",
    name: "leitura-sensor",
    // lazy-loaded
    component: BoardSensor,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;