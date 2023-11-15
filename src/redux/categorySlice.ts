import { createSlice } from "@reduxjs/toolkit";
import { categories } from "@/util/data";

const localData = localStorage.getItem("categories");
const dataCategory = localData ? JSON.parse(localData) : [];

let initialState = categories;

if (dataCategory.length > 0) {
  initialState = dataCategory;
} else {
  initialState = categories;
  localStorage.categories = JSON.stringify(categories);
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    createCategory: (state, action) => {
      const newCategory = action.payload;
      const categoryExists = state.some(
        (category) =>
          category.category.toLowerCase() === newCategory.category.toLowerCase()
      );

      if (!categoryExists) {
        state.push(newCategory);
        localStorage.categories = JSON.stringify(state);
      }
    },
  },
});

export const selectCategories = (state: any) => state.category;

export const { createCategory } = categorySlice.actions;

export default categorySlice.reducer;
