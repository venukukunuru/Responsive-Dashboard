import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice for managing news
const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
  },
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload; // Update the state with the fetched news
    },
  },
});

// Export the action to set news
export const { setNews } = newsSlice.actions;

// Configure the Redux store with the news slice
const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
  },
});

export default store;
