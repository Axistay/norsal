import { configureStore } from "@reduxjs/toolkit"
import savedItemsReducer from "./slices/cartSlice"
import menuReducer from "./slices/menuSlice"

export const store = configureStore({
  reducer: {
    savedItems: savedItemsReducer,
    menu: menuReducer,
  },
})
