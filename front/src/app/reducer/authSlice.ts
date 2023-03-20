import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import { auth } from '../firebase-config';

import { User } from '../models/User';

interface AuthState {
    // user: User | null;
    isLoggedIn: boolean;
    token: string | null;
}

const initialState: AuthState = {
    // user: null,
    token: null,
    isLoggedIn: true,
};

export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.token = null;
            state.isLoggedIn = false;
        }
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
