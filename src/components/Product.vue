<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
    id: string;
    name: string;
    price: number;
    image: string;
}>();

const emit = defineEmits<{
    (e: 'add'): void
}>();
</script>

<template>
    <div>
        <img :src="image" :alt="name" class="w-full aspect-square" />
        <h4 class="font-bold">{{ name }}</h4>
        <p>&pound;{{ price }}</p>
        <RouterLink :to="`/products/${id}`">More info</RouterLink>
        <button class="w-full bg-gray-200 hover:cursor-pointer" @click="emit('add')">Add to cart</button>
    </div>
</template>

<style scoped>
img {
    max-width: 400px;
}
</style>