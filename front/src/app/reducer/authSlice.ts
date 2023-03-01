import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import { auth } from '../firebase-config';

import { User } from '../models/User';

interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: true,
};

export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
