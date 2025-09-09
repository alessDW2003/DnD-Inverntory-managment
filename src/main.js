import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import Aura from "@primeuix/themes/aura";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import router from "./router";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Textarea from "primevue/textarea";
import Inputnumber from "primevue/inputnumber";

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
app.component("p-dialog", Dialog);
app.component("p-inputtext", InputText);
app.component("p-select", Select);
app.component("p-textarea", Textarea);
app.component("p-inputnumber", Inputnumber);
app.mount("#app");
