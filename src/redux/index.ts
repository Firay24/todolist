import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import categorySlice from "./categorySlice";

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
    category: categorySlice,
  },
});
