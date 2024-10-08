<template>
  <teleport to="body">
    <div
      class="w-full flex justify-center items-center flex-col absolute z-50 top-0 left-0 h-screen bg-[#00000083]"
    >
      <v-form class="p-5 w-1/4 rounded bg-white">
        <v-title class="text-2xl block font-bold pb-4">
          <slot name="header"></slot>
        </v-title>

        <v-text-field
          v-model="product.name"
          :rules="[
            (v) => !!v || 'Name is required',
            () => !sameName || 'Name already exists',
          ]"
          :class="{ 'border-red-500': sameName }"
          label="Name"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="product.image"
          :rules="[(v) => !!v || 'Image is required']"
          label="Image"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="product.price"
          type="number"
          :rules="[(v) => v >= 10000 || 'Price must be at least 10000']"
          label="Price"
          min="10000"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="product.quantity"
          type="number"
          :rules="[
            (v) => (v >= 1 && v <= 100) || 'Quantity must be between 1 and 100',
          ]"
          min="1"
          max="100"
          label="Quantity"
          variant="outlined"
        ></v-text-field>

        <v-btn
          @click="isEdit ? handleEdit() : handleAdd()"
          class="mr-4"
          color="blue"
          >Save</v-btn
        >

        <v-btn @click="props.handleHideForm" color="gray">Close</v-btn>
      </v-form>
    </div>
  </teleport>
</template>

<script setup>
import { reactive, ref, watch } from "vue";

const props = defineProps([
  "isEdit",
  "handleHideForm",
  "products",
  "selectedProduct",
]);
const emit = defineEmits(["updateProducts"]);

const product = reactive({
  name: "",
  image: "",
  price: 0,
  quantity: 0,
});

const sameName = ref(false);

watch(
  () => props.selectedProduct,
  (newProduct) => {
    if (newProduct) {
      Object.assign(product, newProduct);
    } else {
      resetProduct();
    }
  }
);

const resetProduct = () => {
  product.name = "";
  product.image = "";
  product.price = 0;
  product.quantity = 0;
  sameName.value = false;
};

const handleAdd = () => {
  resetWarnings();

  if (validateProduct()) {
    const newProduct = {
      ...product,
      id: Math.floor(Math.random() * 10000000000),
    };

    const updatedProducts = [...props.products, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    emit("updateProducts", updatedProducts);
    resetProduct();
    props.handleHideForm();
  }
};

const handleEdit = () => {
  resetWarnings();

  if (validateProduct()) {
    const index = props.products.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      props.products[index] = { ...product };
    }

    localStorage.setItem("products", JSON.stringify(props.products));
    resetProduct();
    props.handleHideForm();
  }
};

const validateProduct = () => {
  if (
    props.products.some(
      (item) => item.name === product.name && item.id !== product.id
    )
  ) {
    sameName.value = true;
    return false;
  }
  return true;
};

const resetWarnings = () => {
  sameName.value = false;
};
</script>

<style scoped></style>
