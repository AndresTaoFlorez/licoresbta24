import { createSlice } from '@reduxjs/toolkit';
import { storageRepository } from '../../repositories/StorageRepository.js';

const STORAGE_KEY = 'location';

// Load location from localStorage
const loadLocationFromStorage = () => {
  return storageRepository.load(STORAGE_KEY, 'Bogotá');
};

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    current: loadLocationFromStorage(),
    isModalOpen: false,
  },
  reducers: {
    setLocation: (state, action) => {
      state.current = action.payload;
      // Save to localStorage using repository
      storageRepository.save(STORAGE_KEY, action.payload);
    },
    openLocationModal: (state) => {
      state.isModalOpen = true;
    },
    closeLocationModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { setLocation, openLocationModal, closeLocationModal } = locationSlice.actions;
export default locationSlice.reducer;
