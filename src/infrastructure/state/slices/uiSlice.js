import { createSlice } from '@reduxjs/toolkit';
import { storageRepository } from '../../repositories/StorageRepository.js';

const UNLOCK_KEY = 'swipeToEnterUnlocked';
const UNLOCK_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

// Check if unlock is still valid
const isUnlockValid = () => {
  return storageRepository.isValid(UNLOCK_KEY, UNLOCK_DURATION);
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isUnlocked: isUnlockValid(),
  },
  reducers: {
    setUnlocked: (state, action) => {
      state.isUnlocked = action.payload;

      // Save to localStorage with timestamp using repository
      if (action.payload) {
        storageRepository.save(UNLOCK_KEY, { timestamp: Date.now() });
      } else {
        storageRepository.remove(UNLOCK_KEY);
      }
    },
  },
});

export const { setUnlocked } = uiSlice.actions;
export default uiSlice.reducer;
