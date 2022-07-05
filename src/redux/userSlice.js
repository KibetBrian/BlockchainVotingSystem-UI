import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userData: null,
    isFetching: false,
    error: false
}

export const userSlice = createSlice(
  { 
    name: 'user',
    initialState,
    reducers: {
        isFetching: (state, data)=>{
          state.isFetching = data.payload
        },
        setUserData: (state, data)=>{
          state.user=data
        }
    }
  }
);

export const {setUserData, isFetching} =userSlice.actions;
export default userSlice.reducer;