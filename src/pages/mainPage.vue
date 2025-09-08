<script setup>
import { onMounted, ref } from "vue";
import { container } from "@/services/ServiceContainer";

const getAllItemsUseCase = container.getGetAllItems();

const items = ref([]);

const addItemUseCase = container.getAddItemUseCase();

const fetchItems = async () => {
  items.value = await getAllItemsUseCase.execute(0);
  console.log(items.value);
};
const addItem = async () => {
  const newItem = {
    name: "New Item",
    description: "A newly added item",
    type: "misc",
    userId: 0,
  };
  console.log(newItem);
  await addItemUseCase.execute(newItem);
  console.log(items.value);
  fetchItems();
};
onMounted(async () => {
  fetchItems();
});
</script>
<template>
  <p-button @click="addItem">Add item</p-button>
  <p-datatable :value="items">
    <p-column field="name" header="Name"> </p-column>
    <p-column field="description" header="Description"> </p-column>
    <p-column field="type" header="Type"> </p-column>
  </p-datatable>
</template>
