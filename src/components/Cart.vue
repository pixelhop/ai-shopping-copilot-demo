<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import ConfettiExplosion from "vue-confetti-explosion";
import { useTimeoutFn } from '@vueuse/core';
import { cart, totalPrice } from '../cart';
const cartOpen = ref(false);


const showConfetti = ref(false);
const { start, stop } = useTimeoutFn(() => {
  showConfetti.value = false;
  stop();
}, 3000);
const totalItems = computed(() => {
    return cart.value.reduce((total, item) => {
        return total + item.qty;
    }, 0);
});
watch(totalItems, async (newTotal, oldTotal) => {
    if (newTotal > oldTotal) {
        showConfetti.value = false;
        await nextTick();
        showConfetti.value = true;
        start();
    }
});
</script>

<template>
    <div class="relative">
        <ConfettiExplosion v-if="showConfetti" class="absolute" />
        <button @click="cartOpen = true" title="Cart" class="bg-none appearance-none bg-transparent focus:border-0 focus:ring-0 focus:outline-0 border-0 relative p-0 py-2 px-2 m-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>

            <span v-if="totalItems > 0" class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-600 text-white rounded-full text-sm flex items-center justify-center">
                {{ totalItems }}
            </span>
        </button>

        <div v-if="cartOpen" class="border border-gray-200 rounded absolute top-14 left-0 bg-white w-72 shadow-xl">
            <button @click="cartOpen = false" title="close cart" class="absolute -left-2 -top-2 p-0 m-0 bg-transparent focus:outline-none focus:ring-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-gray-800">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                </svg>  
            </button>

            <div class="px-6 py-3 border-b border-gray-200">
                <h4 class="font-bold">Your cart</h4>
            </div>
            <div class="px-6 py-2 border-b border-gray-200">
                <div v-if="cart.length === 0" class="text-center">
                    No items in cart
                </div>

                <div class="space-y-3">
                    <div v-for="product in cart" :key="product.id" class="flex gap-2">
                        <img :src="product.image" :alt="product.name" class="size-12" />
                        <div>
                            <h5 class="leading-tight text-sm font-bold">{{ product.name }}</h5>
                            <p class="text-xs text-gray-500">{{ product.qty }}</p>
                            <p class="text-small">&pound;{{ product.price * product.qty }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex px-6 py-2 justify-between">
                <p class="font-bold">Subtotal:</p>
                <p>&pound;{{ totalPrice }}</p>
            </div>
            <div v-if="cart.length > 0" class="px-6 pb-2">
                <button tile="Go to checkout" class="w-full">Go to checkout?</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>