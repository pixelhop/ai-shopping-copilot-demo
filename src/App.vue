<script setup lang="ts">
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { useIntervalFn } from '@vueuse/core';
import { products } from './products';
import Cart from './components/Cart.vue';
import { addToCart, cart, removeFromCart, totalPrice } from './cart';

const router = useRouter();
const chatThingInitialised = ref(false);
const { pause } = useIntervalFn(() => {
  if (!window.chatThing) {
    return;
  }

  if (chatThingInitialised.value) {
    pause();
  }

  window.chatThing.systemMessage('extend', `
    <products>
    ${JSON.stringify(products)}
    </products>
  `)

  window.chatThing.registerPowerUp({
    name: 'Add to basket',
    description: 'Add a product to the basket',
    parameters: {
      productId: {
        type: 'string',
        description: 'The unique product ID',
        required: true
      },
      qty: {
        type: 'number',
        description: 'How many to add',
        required: true
      }
    },
    handler: (args) => {
      return  JSON.parse(JSON.stringify(addToCart(args.productId, args.qty)));
    }
  });

  window.chatThing.registerPowerUp({
    name: 'Remove from basket',
    description: 'Remove a product from the basket',
    parameters: {
      productId: {
        type: 'string',
        description: 'The unique product ID',
        required: true
      }
    },
    handler: (args) => {
      return JSON.parse(JSON.stringify(removeFromCart(args.productId)));
    }
  });

  window.chatThing.registerPowerUp({
    name: 'Get cart',
    description: 'Get cart items and total price',
    parameters: {},
    handler: () => {
      return JSON.parse(JSON.stringify({
        cart: cart.value,
        totalPrice: totalPrice.value
      }))
    }
  });

  window.chatThing.registerPowerUp({
    name: 'Navigate',
    description: 'Navigate to the given page',
    parameters: {
      path: {
        type: 'string',
        description: 'The path to navigate to as an absolute URL starting with /',
        required: true
      }
    },
    handler: (args) => {
      try {
        router.push({ path: args.path });
        return {
          success: true
        };
      } catch (e: any) {
        return {
          success: false
        };
      }
    }
  });

  window.chatThing.showPreview('Hey let me help you with your AI purchase', 1000);
  window.chatThing.show();
  console.log('Chat Thing initialised');
  chatThingInitialised.value = true;
  pause();
}, 200, { immediate: true });


</script>

<template>
  <header>
    <nav class="px-6 py-2 gap-6 flex items-center border-b border-b-gray-200 fixed top-0 left-0 right-0 bg-white z-10">
      <Cart :cart="cart" :total-price="totalPrice" />
      <h1 class="text-lg font-bold">AI shopping co-pilot demo</h1>
    </nav>
  </header>
  <div class="pt-24">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

</style>
