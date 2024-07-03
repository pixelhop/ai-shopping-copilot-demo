<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import { useSeoMeta } from 'unhead';
import { products } from '../products';
import { addToCart } from '../cart';
const props = defineProps<{
    productId: string;
}>();
const product = computed(() => products.find(p => p.id === props.productId))

watchEffect(() => {
    useSeoMeta({
        title: product.value?.name,
        description: product.value?.description
    });
});

</script>

<template>
    <section class="container mx-auto">
        <div class="grid grid-cols-3 gap-12" v-if="product" :key="product.id">
            <div class="col-span-1">
                <img :src="product?.image" :alt="product.name">
            </div>
            <div>
                <ul class="flex mb-6">
                    <li>
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li class="ml-2 text-gray-500">
                        &gt; {{ product.name }}
                    </li>
                </ul>

                <h1 class="text-6xl font-bold">{{ product.name }}</h1>

                <div class="flex items-center gap-6 py-4">
                    <p class="text-xl">&pound;{{ product.price }}</p>

                    <button class="" @click="addToCart(product.id, 1)">Add to cart</button>
                </div>

                <div v-html="product.description" />
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>