<script setup lang="ts">
import { RouterView } from 'vue-router';
import Cart from './components/Cart.vue';
import { cart, totalPrice } from './cart';
</script>

<template>
  <header>
    <nav class="px-6 py-2 gap-6 flex items-center border-b border-b-gray-200 fixed top-0 left-0 right-0 bg-white z-10">
      <Cart :cart="cart" :total-price="totalPrice" />
      <router-link to="/"><h1 class="text-lg font-bold text-gray-900">AI shopping co-pilot demo</h1></router-link>
    </nav>
  </header>
  <div class="pt-12">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

</style>
