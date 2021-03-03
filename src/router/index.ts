import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Landing from "../views/Landing.vue";

function createTitle(title: string) {
  return `${title} • Definario`;
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Landing",
    meta: {
      title: "Definario - twoja encyklopedia",
      navbar: { visible: false, active: "Home" },
      header: { visible: true, landing: true }
    },
    component: Landing
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: createTitle("strona główna"),
      navbar: { visible: true, active: "Home" },
      header: { visible: true, landing: false }
    },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/home/mathematical_tables",
    name: "Mathematical tables",
    meta: {
      title: createTitle("tablice maturalne"),
      navbar: { visible: false, active: "Home" },
      header: { visible: true, landing: false, backArrow: true },
      transition: "slide-right"
    },
    component: () =>
      import(
        /* webpackChunkName: "mathematical_tables" */ "../views/MathematicalTables.vue"
      )
  },
  {
    path: "/learn",
    name: "Learn",
    meta: {
      title: createTitle("nauka"),
      navbar: { visible: true, active: "Learn" },
      header: { visible: true, landing: false }
    },
    component: () =>
      import(/* webpackChunkName: "learn" */ "../views/Learn.vue")
  },
  {
    path: "/search",
    name: "Search",
    meta: {
      title: createTitle("wyszukiwanie"),
      navbar: { visible: true, active: "Search" },
      header: { visible: true, landing: false }
    },
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue")
  },
  {
    path: "/saved",
    name: "Saved",
    meta: {
      title: createTitle("zapisne"),
      navbar: { visible: true, active: "Saved" },
      header: { visible: true, landing: false }
    },
    component: () =>
      import(/* webpackChunkName: "saved" */ "../views/Saved.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: "Page not found: 404",
    meta: {
      title: createTitle("nie znaleziono strony"),
      navbar: { visible: true, active: "" },
      header: { visible: true, landing: false }
    },
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { left: savedPosition?.left, top: savedPosition?.top };
    // console.log(savedPosition);
    // return new Promise(resolve => {
    //   resolve({ left: savedPosition?.left, top: savedPosition?.top });
    // });
  }
});

router.beforeEach((to, from, next) => {
  const shouldRedirectHome = localStorage.getItem("visited") === "true";

  // if previously visited AND trying to get to the landing page
  if (shouldRedirectHome && to.name?.toString() === "Landing") {
    next({ name: "Home" });
    // if new to the site AND not on landing page
  } else if (!shouldRedirectHome && to.name?.toString() !== "Landing") {
    next({ name: "Landing" });
  } else {
    next();
  }

  document.title = to.meta.title;
});

export default router;
