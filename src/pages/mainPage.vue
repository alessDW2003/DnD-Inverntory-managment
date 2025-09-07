<script setup>
import { onMounted, ref } from "vue";
import { container } from "@/services/ServiceContainer";

const getAllItemsUseCase = container.getGetAllItems();

const items = ref([]);

onMounted(async () => {
  items.value = await getAllItemsUseCase.execute(0);
  console.log(items.value);
});
</script>
<template>
  <p-button>Add item</p-button>
  <p-datatable :value="items">
    <p-column field="name" header="Name"> </p-column>
    <p-column field="description" header="Description"> </p-column>
  </p-datatable>
</template>
