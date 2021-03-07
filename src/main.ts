import { createApp } from "vue"; // Vue
import App from "./App.vue"; // Root
import "./registerServiceWorker"; // PWA
import router from "./router"; // Routing
import { store, key } from "./store"; // Vuex

store.dispatch("initialFetch");

createApp(App)
  .use(store, key)
  .use(router)
  .mount("#app");
