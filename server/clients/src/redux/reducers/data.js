import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    value: {},
  },
  reducers: {
    AddData(state, action) {
      state.value = {...action.payload};
    },
   
  }
});

export const dataAction = dataSlice.actions;

export default dataSlice;