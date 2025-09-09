<script setup>
import { onMounted, ref } from "vue";
import { container } from "@/services/ServiceContainer";

const items = ref([]);
const dialogVisible = ref(false);
const editDialogVisible = ref(false);
const options = ref([
  { label: "Weapon (melee)", value: "weapon melee" },
  { label: "Weapon (ranged)", value: "weapon ranged" },
  { label: "Armor (light)", value: "armor light" },
  { label: "Armor (medium)", value: "armor medium" },
  { label: "Armor (heavy)", value: "armor heavy" },
  { label: "Potion", value: "potion" },
  { label: "Misc", value: "misc" },
]);
const selectedItem = ref();
const getAllItemsUseCase = container.getGetAllItems();
const addItemUseCase = container.getAddItemUseCase();
const deleteItemUseCase = container.getDeleteItemUseCase();
const updateItemUseCase = container.getUpdateItemUseCase();

const fetchItems = async () => {
  items.value = await getAllItemsUseCase.execute(0);
  filterItems();
  console.log(items.value);
};

const filterItems = () => {
  items.value = items.value.sort((a, b) => {
    if (a.favourite === b.favourite) {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA; // meest recent eerst
    }
    return a.favourite ? -1 : 1;
  });
};

const openDialogue = () => {
  dialogVisible.value = true;
};

const form = ref({
  name: "",
  description: "",
  type: "",
  quantity: "",
});
const deleteItem = async (item) => {
  await deleteItemUseCase.execute(item.id);
  fetchItems();
};
const refreshForm = () => {
  form.value = { name: "", description: "", type: "" };
};
const addItem = async () => {
  if (
    !form.value.name ||
    !form.value.description ||
    !form.value.type ||
    !form.value.quantity
  ) {
    alert("Please fill in all fields");
    return;
  }

  const newItem = {
    name: form.value.name,
    description: form.value.description,
    type: form.value.type,
    quantity: form.value.quantity,
    favourite: false,
    userId: 0,
  };

  console.log("New item:", newItem);
  await addItemUseCase.execute(newItem);
  fetchItems();
  //reset form
  form.value = { name: "", description: "", type: "" };
  dialogVisible.value = false;
};

const updateFavouriteItem = async (item) => {
  item.setFavourite(!item.isFavourite());
  await updateItemUseCase.execute(item);
  filterItems();
};

onMounted(async () => {
  fetchItems();
});
</script>
<template>
  <p-button @click="openDialogue">Add item</p-button>
  <p-datatable :value="items" class="w-3/4 mx-auto" paginator :rows="10">
    <template #empty>
      <p class="italic ">Geen items gevonden</p>
    </template>
    <p-column field="name" header="Name"> </p-column>
    <!-- <p-column field="description" header="Description"> </p-column> -->
    <p-column field="type" header="Type"> </p-column>
    <p-column field="quantity" header="Qty."> </p-column>
    <p-column field="favourite" class="text-center">
      <template #body="slotProps">
        <div
          v-if="slotProps.data.favourite"
          class="text-yellow-400 text-center"
        >
          <i
            class="pi pi-star-fill cursor-pointer"
            style="font-size: 1rem; color: gold"
            @click="updateFavouriteItem(slotProps.data)"
          ></i>
        </div>
        <div v-else class="text-gray-400 text-center">
          <i
            class="pi pi-star cursor-pointer"
            @click="updateFavouriteItem(slotProps.data)"
            style="font-size: 1rem"
          ></i>
        </div>
      </template>
    </p-column>
    <p-column header="Info">
      <template #body="slotProps">
        <div>
          <i
            @click="(editDialogVisible = true), (selectedItem = slotProps.data)"
            class="pi pi-info-circle cursor-pointer"
            style="font-size: 1rem"
          ></i>
        </div>
      </template>
    </p-column>
    <p-column>
      <template #body="slotProps">
        <div>
          <i
            class="pi pi-trash cursor-pointer"
            style="font-size: 1rem; color: red"
            @click="deleteItem(slotProps.data)"
          ></i>
        </div>
      </template>
    </p-column>
  </p-datatable>

  <!-- /* Dialog for adding a new item */ -->
  <p-dialog
    header="Add New Item"
    v-model:visible="dialogVisible"
    modal
    class="w-[800px]"
  >
    <div class="flex flex-col gap-3 p-4">
      <div class="flex flex-col">
        <label for="name" class="mb-1">Name</label>
        <p-inputtext id="name" v-model="form.name" placeholder="Enter name" />
      </div>

      <div class="flex flex-col">
        <label for="description" class="mb-1">Description</label>
        <p-textarea
          v-model="form.description"
          autoResize
          rows="3"
          placeholder="Enter description"
        />
      </div>

      <div class="flex flex-col">
        <label for="type" class="mb-1">Type</label>
        <p-select
          id="type"
          v-model="form.type"
          :options="options"
          placeholder="Select type"
          optionLabel="label"
          optionValue="value"
        />
      </div>

      <div class="flex flex-col">
        <label for="quantity" class="mb-1">Quantity</label>
        <p-inputnumber v-model="form.quantity" placeholder="Enter quantity" />
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <p-button
          label="Cancel"
          severity="secondary"
          @click="(dialogVisible = false), refreshForm()"
        />
        <p-button label="Add" icon="pi pi-check" @click="addItem" />
      </div>
    </div>
  </p-dialog>

  <!-- dialog voor editing an item -->
  <!-- <p-dialog v-model:visible="editDialogVisible" modal class="w-[800px]">
    <div>
      <i
        class="pi pi-pencil cursor-pointer"
        style="font-size: 1rem"
        @click="editItem"
      ></i>
    </div>
    <div class="flex flex-col gap-3 p-4">
      <div class="flex flex-col">
        <label for="name" class="mb-1">Name</label>
        <p-inputtext
          id="name"
          v-model="form.name"
          :placeholder="selectedItem.name"
          disabled
        />
      </div>

      <div class="flex flex-col">
        <label for="description" class="mb-1">Description</label>
        <p-textarea
          v-model="form.description"
          autoResize
          rows="3"
          placeholder="Enter description"
        />
      </div>

      <div class="flex flex-col">
        <label for="type" class="mb-1">Type</label>
        <p-select
          id="type"
          v-model="form.type"
          :options="options"
          placeholder="Select type"
          optionLabel="label"
          optionValue="value"
        />
      </div>

      <div class="flex flex-col">
        <label for="quantity" class="mb-1">Quantity</label>
        <p-inputnumber v-model="form.quantity" placeholder="Enter quantity" />
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <p-button
          label="Cancel"
          severity="secondary"
          @click="(dialogVisible = false), refreshForm()"
        />
        <p-button label="Add" icon="pi pi-check" @click="addItem" />
      </div>
    </div>
  </p-dialog> -->
</template>
