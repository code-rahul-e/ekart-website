import { createSlice } from "@reduxjs/toolkit";

// Load saved cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addItem(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },
    removeItem(state, action) {
      const updated = state.filter((p) => p.id !== action.payload);
      saveCartToLocalStorage(updated);
      return updated;
    },
    incrementQuantity(state, action) {
      const item = state.find((p) => p.id === action.payload);
      if (item) item.quantity += 1;
      saveCartToLocalStorage(state);
    },
    decrementQuantity(state, action) {
      let updatedState = state;
      const item = state.find((p) => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        updatedState = state.filter((p) => p.id !== action.payload);
      }
      saveCartToLocalStorage(updatedState);
      return updatedState;
    },
    clearCart() {
      saveCartToLocalStorage([]);
      return [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
