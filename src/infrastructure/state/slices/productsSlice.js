import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadProducts } from '../../../application/useCases/products/LoadProducts.js';
import { filterProductsByCategory } from '../../../application/useCases/products/FilterProductsByCategory.js';

// Async thunk to fetch products - now uses use case
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await loadProducts();
    return products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: {},
    filteredItems: {},
    selectedCategory: '',
    loading: false,
    error: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      // Use use case for filtering logic
      state.filteredItems = filterProductsByCategory(state.items, action.payload);
    },
    clearCategory: (state) => {
      state.selectedCategory = '';
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory, clearCategory } = productsSlice.actions;
export default productsSlice.reducer;
