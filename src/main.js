import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import router from "./router";
import Button from "primevue/button";
import "./assets/main.css";

const app = createApp(App).use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.component("p-datatable", DataTable);
app.component("p-column", Column);
app.component("p-button", Button);
app.mount("#app");
