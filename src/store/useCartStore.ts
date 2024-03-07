import { Product } from "products";
import { create } from "zustand";

type ProductWithQuantity = Product & { quantity: number };

type CartStore = {
  items: ProductWithQuantity[];
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  removeItemMaxQuantity: (item: Product) => void;
  total: number;
  count: number;
  isOpen: boolean;
  toggleIsOpen: () => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  isOpen: true,
  total: 0,
  count: 0,
  items: [],
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ count: 0, total: 0, items: [] }),
  addItem: (item) => {
    set((state) => {
      // Create a new cart so we don't mutate our state
      let newItems = [...state.items];

      const productIndex = state.items.findIndex(
        (stateItem) => stateItem.id === item.id
      );

      // If the product is already in the cart we want to increase the quantity
      if (productIndex !== -1) {
        newItems = [
          ...newItems.slice(0, productIndex),
          {
            ...newItems[productIndex],
            quantity: newItems[productIndex].quantity + 1,
          },
          ...newItems.slice(productIndex + 1),
        ];
        // Else we want to add the product to the cart array
      } else {
        newItems = [...newItems, { ...item, quantity: 1 }];
      }

      return {
        items: newItems,
        total: calcTotal(newItems),
        count: calcCount(newItems),
      };
    });
  },
  removeItem: (item) => {
    set((state) => {
      let items = state.items;

      if (item.quantity > 1) {
        // FIXME: This is a placeholder for the actual logic to remove an item from the cart
        item.quantity = item.quantity--;
      } else {
        items = state.items.filter((i) => i !== item);
      }

      return { items, total: calcTotal(items), count: calcCount(items) };
    });
  },
  removeItemMaxQuantity: (item) => {
    set((state) => {
      let items = state.items;

      items = state.items.filter((i) => i !== item);

      return { items, total: calcTotal(items), count: calcCount(items) };
    });
  },
}));

function calcTotal(cart: Product[]) {
  return cart.reduce((currentTotal, product) => {
    const itemDiscountedPrice =
      (product.price * (100 - product.discountPercentage)) / 100;
    currentTotal += itemDiscountedPrice * product.quantity;
    return Number(currentTotal.toFixed(2));
  }, 0);
}

function calcCount(cart: Product[]) {
  return cart.reduce((currentCount, product) => {
    currentCount += product.quantity;
    return currentCount;
  }, 0);
}
