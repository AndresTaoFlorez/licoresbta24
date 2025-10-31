import { createSelector } from '@reduxjs/toolkit';

// Base selectors
const selectProductsState = (state) => state.products;
const selectLocationState = (state) => state.location;

// Memoized selector for all products
export const selectAllProducts = createSelector(
  [selectProductsState],
  (productsState) => productsState.items
);

// Memoized selector for filtered products
export const selectFilteredProducts = createSelector(
  [selectProductsState],
  (productsState) => productsState.filteredItems
);

// Memoized selector for selected category
export const selectSelectedCategory = createSelector(
  [selectProductsState],
  (productsState) => productsState.selectedCategory
);

// Memoized selector for loading state
export const selectProductsLoading = createSelector(
  [selectProductsState],
  (productsState) => productsState.loading
);

// Memoized selector for error state
export const selectProductsError = createSelector(
  [selectProductsState],
  (productsState) => productsState.error
);

// Memoized selector for products by category
export const selectProductsByCategory = createSelector(
  [selectAllProducts, (state, category) => category],
  (products, category) => {
    if (!category || category === '') return products;
    return Object.keys(products)
      .filter(key => products[key].CATEGORIA === category)
      .reduce((acc, key) => {
        acc[key] = products[key];
        return acc;
      }, {});
  }
);

// Memoized selector for current location
export const selectCurrentLocation = createSelector(
  [selectLocationState],
  (locationState) => locationState.current
);
