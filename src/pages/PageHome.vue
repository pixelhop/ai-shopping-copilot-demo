<script setup lang="ts">
import { products } from '../products';
import Product from '../components/Product.vue';
import { addToCart } from '../cart';
</script>

<template>
    <section class="container mx-auto pt-12">
      <div class="lg:w-1/2">
        <h2 class="text-6xl font-bold">AI Emporium</h2>
        <p class="text-2xl">This is an example demonstrating how to create a basic AI shopping co-pilot using <a href="https://chatthing.ai" target="_blank">Chat Thing.</a></p>
        <p class="text-2xl mt-6">Find all the best AI related merch before its too late!</p>
      </div>

      
      <h3 class="text-2xl font-bold mt-16 mb-4">Products</h3>

      <div class="grid grid-cols-4 gap-6 mb-64">
        <Product 
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :name="product.name"
          :price="product.price"
          :image="product.image"
          @add="addToCart(product.id, 1)"
        />
      </div>
    </section>
</template>

<style scoped>

</style>