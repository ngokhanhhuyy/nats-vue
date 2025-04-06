import "./assets/index.css";
import "bootstrap";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#root");
