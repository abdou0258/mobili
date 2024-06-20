// src/features/favorites/favoritesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async ({ userId, listingId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/listing/favourites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, listingId }),
      });
      if (response.status === 400) {
        await fetch(`/api/listing/favourites`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, listingId }),
        });
        return { listingId, isFavorite: false };
      } else if (response.status === 201) {
        return { listingId, isFavorite: true };
      }
      throw new Error('Unexpected response');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {},
  reducers: {
    setFavorites(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      const { listingId, isFavorite } = action.payload;
      state[listingId] = isFavorite;
    });
  },
});

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
