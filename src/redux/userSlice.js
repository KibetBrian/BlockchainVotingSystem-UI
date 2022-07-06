import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  data: null,
  isFetching: false,
  error: false
}

export const userSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducers: {
      isFetching:(state, data) => {
        state.isFetching=data.payload
      },
      setUserData: (state, data) => {
        state.data=data.payload
      }
    }
  }
);

export const { setUserData, isFetching } = userSlice.actions;
export default userSlice.reducer;