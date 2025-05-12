import { createSlice } from "@reduxjs/toolkit";

// Helper to load cart from localStorage
const loadCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : { items: [], total: 0 };
  } catch {
    return { items: [], total: 0 };
  }
};

// Helper to save cart to localStorage
const saveCart = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch {
    // Fail silently
  }
};

const initialState = loadCart();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCart(state);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCart(state);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
      }

      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCart(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
