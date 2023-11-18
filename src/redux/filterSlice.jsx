import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export const filterReduce = filterSlice.reducer;