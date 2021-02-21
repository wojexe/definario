import { createApp } from "vue"; // Vue
import App from "./App.vue"; // Root
import "./registerServiceWorker"; // PWA
import router from "./router"; // Routing

createApp(App)
  .use(router)
  .mount("#app");
