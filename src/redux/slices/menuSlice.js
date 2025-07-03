import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  plates: [],
  types: [],
  filteredPlates: [],
  searchTerm: "",
  currentCategory: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setInitialMenuData: (state, action) => {
      state.categories = action.payload.categories;
      state.plates = action.payload.plates;
      state.types = action.payload.types;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
      state.filteredPlates = state.plates.filter(
        (plate) => plate.categoryId === action.payload
      );
    },
    setSearchTerm: (state, action) => {
      const term = action.payload.toLowerCase();
      state.searchTerm = term;

      const matches = (plate) => {
        // Check all languages for title and description
        const langs = ['en', 'fr', 'es', 'ar'];
        return langs.some(lang =>
          (plate.title?.[lang] && plate.title[lang].toLowerCase().includes(term)) ||
          (plate.description?.[lang] && plate.description[lang].toLowerCase().includes(term))
        );
      };

      state.filteredPlates = state.plates.filter((plate) =>
        state.currentCategory
          ? plate.categoryId === state.currentCategory && matches(plate)
          : matches(plate)
      );
    },
    clearSearch: (state) => {
      state.searchTerm = "";
      state.filteredPlates = state.currentCategory
        ? state.plates.filter((plate) => plate.categoryId === state.currentCategory)
        : [];
    },
  },
});

export const {
  setInitialMenuData,
  setCurrentCategory,
  setSearchTerm,
  clearSearch,
} = menuSlice.actions;

export default menuSlice.reducer;
