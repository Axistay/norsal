import { createSlice } from "@reduxjs/toolkit";

// Helper to get current restaurant ID
const getCurrentRestaurantId = () => {
  const cityId = localStorage.getItem("selectedCity");
  const menuId = localStorage.getItem("idMenu");
  
  // Map menu ID to restaurant name
  if (cityId === "nador") {
    if (menuId === "1") return `${cityId}_golf`;
    else if (menuId === "2") return `${cityId}_norsal`;
    else if (menuId === "3") return `${cityId}_beachclub`;
  } else if (cityId === "al_hoceima") {
    if (menuId === "1") return `${cityId}_norsal`;
    else if (menuId === "2") return `${cityId}_beachclub`;
  }
  
  return `${cityId}_unknown`;
};

// Helper to get current restaurant name
export const getCurrentRestaurantName = () => {
  const cityId = localStorage.getItem("selectedCity");
  const menuId = localStorage.getItem("idMenu");
  
  if (cityId === "nador") {
    switch (menuId) {
      case "1":
        return "Nador Golf Restaurant";
      case "2":
        return "Nador Norsal Restaurant";
      case "3":
        return "Nador Beach Club";
      default:
        return "Unknown Restaurant";
    }
  } else if (cityId === "al_hoceima") {
    switch (menuId) {
      case "1":
        return "Al Hoceima Norsal Restaurant";
      case "2":
        return "Al Hoceima Beach Club";
      default:
        return "Unknown Restaurant";
    }
  }
  
  return "Unknown Restaurant";
};

// Helper to get restaurant name by ID
export const getRestaurantNameById = (restaurantId) => {
  const [cityId, restaurantName] = restaurantId.split('_');
  
  if (cityId === "nador") {
    switch (restaurantName) {
      case "golf":
        return "Nador Golf Restaurant";
      case "norsal":
        return "Nador Norsal Restaurant";
      case "beachclub":
        return "Nador Beach Club";
      default:
        return "Unknown Restaurant";
    }
  } else if (cityId === "al_hoceima") {
    switch (restaurantName) {
      case "norsal":
        return "Al Hoceima Norsal Restaurant";
      case "beachclub":
        return "Al Hoceima Beach Club";
      default:
        return "Unknown Restaurant";
    }
  }
  
  return "Unknown Restaurant";
};

// Helper to clear all saved items (for debugging)
export const clearAllSavedItems = () => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('savedItems_')) {
        localStorage.removeItem(key);
      }
    });
  } catch {
    // Fail silently
  }
};

// Helper to load saved items from localStorage
const loadSavedItems = () => {
  try {
    const stored = localStorage.getItem("savedItems");
    return stored ? JSON.parse(stored) : { items: [], total: 0 };
  } catch {
    return { items: [], total: 0 };
  }
};

// Helper to save items to localStorage
const saveItems = (state) => {
  try {
    localStorage.setItem("savedItems", JSON.stringify(state));
  } catch {
    // Fail silently
  }
};

const initialState = loadSavedItems();

export const savedItemsSlice = createSlice({
  name: "savedItems",
  initialState,
  reducers: {
    saveItem: (state, action) => {
      const currentRestaurantId = getCurrentRestaurantId();
      const currentRestaurantName = getCurrentRestaurantName();
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.restaurantId === currentRestaurantId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ 
          ...action.payload, 
          quantity: 1,
          restaurantId: currentRestaurantId,
          restaurantName: currentRestaurantName
        });
      }

      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveItems(state);
    },

    removeSavedItem: (state, action) => {
      const currentRestaurantId = getCurrentRestaurantId();
      state.items = state.items.filter(
        (item) => !(item.id === action.payload && item.restaurantId === currentRestaurantId)
      );
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveItems(state);
    },

    updateSavedItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const currentRestaurantId = getCurrentRestaurantId();
      const item = state.items.find(
        (item) => item.id === id && item.restaurantId === currentRestaurantId
      );

      if (item) {
        item.quantity = quantity;
      }

      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveItems(state);
    },

    clearAllSavedItems: (state) => {
      state.items = [];
      state.total = 0;
      saveItems(state);
    },

    // Clear saved items for current restaurant only
    clearCurrentRestaurantSavedItems: (state) => {
      const currentRestaurantId = getCurrentRestaurantId();
      state.items = state.items.filter(item => item.restaurantId !== currentRestaurantId);
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveItems(state);
    },

    // Load saved items (no changes needed as we use a single storage)
    loadSavedItemsForRestaurant: (state) => {
      // This function is kept for compatibility but doesn't need to do anything
      // as we now use a single storage for all restaurants
    },
  },
});

export const { 
  saveItem, 
  removeSavedItem, 
  updateSavedItemQuantity, 
  clearAllSavedItems: clearAllSavedItemsAction, 
  clearCurrentRestaurantSavedItems,
  loadSavedItemsForRestaurant 
} = savedItemsSlice.actions;

export default savedItemsSlice.reducer;
