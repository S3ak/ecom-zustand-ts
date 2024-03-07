import { Product } from "products";
import { create } from "zustand";

type ProductWithQuantity = Product & { quantity: number };

type State = {
  items: ProductWithQuantity[];
  total: number;
  count: number;
  isOpen: boolean;
};

type Action = {
  addItem: (item: Product | ProductWithQuantity) => void;
  removeItem: (item: Product | ProductWithQuantity) => void;
  removeItemMaxQuantity: (item: Product) => void;
  toggleIsOpen: () => void;
  clearCart: () => void;
};

const initialState: State = {
  isOpen: false,
  total: 0,
  count: 0,
  items: [],
};

export const useCartStore = create<State & Action>((set) => ({
  ...initialState,
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set(initialState),
  addItem: (item) => {
    set((state) => {
      let newItems = [];

      const product = state.items.find((stateItem) => stateItem.id === item.id);

      // If the product is already in the cart we want to increase the quantity
      if (product) {
        product.quantity = product.quantity + 1;
        // Create a new array but insert the modified product
        newItems = state.items.map((i) => (i.id === product.id ? product : i));
        // Else we want to add the product to the cart array
      } else {
        newItems = [...state.items, { ...item, quantity: 1 }];
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
      let newItems = [];

      if (item.quantity > 1) {
        // We decrease the quantity if the product is already in the cart
        item.quantity = item.quantity - 1;
        // We create a new cart so we don't mutate our state but we use the map to edit the item in the array
        newItems = state.items.map((i) => (i.id === item.id ? item : i));
      } else {
        newItems = state.items.filter((i) => i !== item);
      }

      return {
        items: newItems,
        total: calcTotal(newItems),
        count: calcCount(newItems),
      };
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
