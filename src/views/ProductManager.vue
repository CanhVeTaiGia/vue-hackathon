<template>
  <main class="w-4/5 p-5">
    <header class="flex mb-3 w-full justify-between">
      <h2 class="text-2xl">Product Manager</h2>
      <v-btn @click="handleAddProduct" color="blue">Add New Product</v-btn>
    </header>

    <v-table height="500px" fixed-header>
      <thead>
        <tr>
          <th> STT </th>
          <th> Image </th>
          <th> Name </th>
          <th> Price </th>
          <th> Quantity </th>
          <th> Option </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>
            <v-img
              :width="80"
              aspect-ratio="1/1"
              cover
              :src="product.image"
            ></v-img>
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <v-btn class="mr-4" color="orange" @click="handleEditProduct(index)"
              >Edit</v-btn
            >
            <v-btn color="red" @click="handleDeleteProduct(index)"
              >Delete</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>

    <FormModal
      v-if="showForm"
      :products="products"
      :isEdit="isEdit"
      :selectedProduct="selectedProduct"
      :handleHideForm="handleHideForm"
      @updateProducts="updateProducts"
    >
      <template #header>
        <p v-if="isEdit">Edit Product</p>
        <p v-else>Add Product</p>
      </template>
    </FormModal>
  </main>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import FormModal from "@/components/FormModal.vue";

const products = reactive(JSON.parse(localStorage.getItem("products")) || []);
const showForm = ref(false);
const isEdit = ref(false);
const selectedProduct = ref({ name: "", image: "", price: 0, quantity: 0 });

const handleAddProduct = () => {
  isEdit.value = false;
  selectedProduct.value = { name: "", image: "", price: 0, quantity: 0 };
  showForm.value = true;
};

const handleEditProduct = (index) => {
  isEdit.value = true;
  selectedProduct.value = { ...products[index] };
  showForm.value = true;
};

const handleDeleteProduct = (index) => {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
};

const handleHideForm = () => {
  showForm.value = false;
};

const updateProducts = (updatedProducts) => {
  products.splice(0, products.length, ...updatedProducts);
};

onMounted(() => {
  const savedProducts = JSON.parse(localStorage.getItem("products"));
  if (savedProducts) {
    products.splice(0, products.length, ...savedProducts);
  }
});
</script>

<style scoped></style>
