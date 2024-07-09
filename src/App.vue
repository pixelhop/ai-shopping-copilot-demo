<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { products } from './products';
import Cart from './components/Cart.vue';
import { addToCart, cart, removeFromCart, totalPrice } from './cart';
import { useChatThing } from './composables/useChatThing';

const router = useRouter();

const chatThingInitialised = ref(false);
onMounted(async () => {
  const chatThing = await useChatThing();
  // We extend the context we a list of our products
  chatThing.systemMessage('extend', `
    <products>
    ${JSON.stringify(products)}
    </products>
  `)

  // Next we register our custom power-ups
  chatThing.registerPowerUp({
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
      return addToCart(args.productId, args.qty);
    }
  });

  chatThing.registerPowerUp({
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
      return removeFromCart(args.productId);
    }
  });

  chatThing.registerPowerUp({
    name: 'Get cart',
    description: 'Get cart items and total price',
    parameters: {},
    handler: () => {
      return {
        cart: cart.value,
        totalPrice: totalPrice.value
      }
    }
  });

  chatThing.registerPowerUp({
    name: 'Get order details',
    description: 'Get details about an order including shipping status',
    parameters: {
      orderNumber: {
        type: 'string',
        description: 'The unique order number',
        required: true
      },
      email: {
        type: 'string',
        description: 'The email used for the order',
        required: true
      }
    },
    handler: (args) => {

      const orderDate = new Date();
      const items = [
        {
          ...products[1],
          qty: 1
        },
        {
          ...products[3],
          qty: 2
        }
      ];
      
      const totalPrice = items.reduce((total, item) => {
        return total + item.qty * item.price;
      }, 0);

      return {
        orderNumber: args.orderNumber,
        email: args.email,
        orderDate: orderDate.toISOString(),
        items,
        totalPrice,
        shipping: {
          address: {
            firstName: 'Sam',
            lastName: 'Altman',
            line1: '61 AI Land',
            line2: '',
            city: 'Newquay',
            county: 'Cornwall',
            postcode: 'TR7 3ER',
            country: 'United Kingdom'
          },
          status: 'shipped',
          carrier: 'DPD',
          trackingNumber: 'DPD536247K382'
        }
      }
    }
  });

  chatThing.registerPowerUp({
    name: 'Navigate',
    description: 'Navigate to the given page',
    parameters: {
      path: {
        type: 'string',
        description: 'The path to navigate to as an absolute URL starting with /',
        required: true
      }
    },
    handler: async (args) => {
      try {
        await router.push({ path: args.path });
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

  // Pop-up a message to grab attention
  chatThing.showPreview('👋 Hey do you need a hand purchasing cool AI merch or with your order?', 0);
  console.log('Chat Thing initialised');
  chatThingInitialised.value = true;
});

</script>

<template>
  <header>
    <nav class="px-6 py-2 gap-6 flex items-center border-b border-b-gray-200 fixed top-0 left-0 right-0 bg-white z-10">
      <Cart :cart="cart" :total-price="totalPrice" />
      <h1 class="text-lg font-bold">AI shopping co-pilot demo</h1>
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
