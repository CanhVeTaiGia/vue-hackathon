import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      redirect: "/admin",
    },

    {
      path: "/admin",
      name: "dashboard",
      component: () =>
        import(/* webChunkName: "admin" */ "@/views/Dashboard.vue"),
    },
    {
      path: "/admin/manager-category",
      name: "category-manager",
      component: () =>
        import(
          /* webChunkName: "category-manager" */ "@/views/CategoryManager.vue"
        ),
    },
    {
      path: "/admin/manager-product",
      name: "product-manager",
      component: () =>
        import(
          /* webChunkName: "product-manager" */ "@/views/ProductManager.vue"
        ),
    },
  ],
});

export default router;
