import { ref, computed } from 'vue';
import { Product } from './types';
import { products } from './products';

export const cart = ref<(Product & { qty: number })[]>([]);
export const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + item.qty * item.price;
  }, 0);
});

export function addToCart(productId: string, qty: number) {
  const product = products.find((product) => product.id === productId);
  const existingProductInCart = cart.value.find(
    (product) => product.id === productId
  );

  if (existingProductInCart) {
    existingProductInCart.qty += qty;
  } else if (product) {
    cart.value.push({
      ...product,
      qty,
    });
  }

  return {
    cart: cart.value,
    totalPrice: totalPrice.value,
  };
}

export function removeFromCart(productId: string) {
  const cartIndex = cart.value.findIndex((product) => product.id === productId);
  if (cartIndex !== -1) {
    cart.value.splice(cartIndex, 1);
  }

  return {
    cart: cart.value,
    totalPrice: totalPrice.value,
  };
}