import { createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user:false,
    }
    ,reducers: {
       startSession: (state, action) => {
            state.user = action.payload;
       },
       destroySession: (state, action) => {
            state.user = null;
            Cookies.remove('user');
        }, 
    }
});

export const activeUser = (state) => state.user.user;
export const {startSession,destroySession} = userSlice.actions;
export default userSlice.reducer;