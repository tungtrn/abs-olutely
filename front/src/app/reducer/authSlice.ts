import { createSlice } from '@reduxjs/toolkit';

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
