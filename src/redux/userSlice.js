import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {}
}

export const userSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducers: {
        setUser:(state, user)=>{
          state.user = user
        }
    }
  }
);

export const {setUser} =userSlice.actions;
export default userSlice.reducer;