import { createSlice } from '@reduxjs/toolkit';

export const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    files: [],
    sortBy: 'title', // nilai default
    sortOrder: 'asc', // nilai default
    selectedQueQue: 1,
  },
  reducers: {
    setAudioFiles: (state, action) => {
      state.files = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSelectedQueQue: (state, action) => {
      state.selectedQueQue = action.payload;
    }
  },
});

export const { setAudioFiles, setSortBy, setSortOrder, setSelectedQueQue } = audioSlice.actions;

export default audioSlice.reducer;
