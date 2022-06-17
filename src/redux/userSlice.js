import { createSlice } from "@reduxjs/toolkit";


const initialState = {}

export const userSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducer: {
        setUser:(state, user)=>{
          state.user = user
        }
    }
  }
);

export const {setUser} =userSlice.actions;
export default userSlice.reducer;