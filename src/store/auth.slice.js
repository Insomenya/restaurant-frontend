import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history, fetchWrapper } from 'src/helpers';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        error: null
    }
}

function createReducers() {
    return {
        logout,
        savePassword
    };

    function logout(state) {
        state.user = null;
        state.afterRegUser = null;
        localStorage.removeItem('user');
        history.navigate('/auth');
    }

    function savePassword(state, action) {
        state.afterRegUser = {
            password: action.payload
        };
    }
}

function createExtraActions() {
    const baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/auth`;

    return {
        authenticate: authenticate(),
        getUserData: getUserData(),
        verifyToken: verifyToken(),
        createUser: createUser(),
    };

    function authenticate() {
        return createAsyncThunk(
            `${name}/authenticate`,
            async ({ email, password }) => await fetchWrapper.post(`${baseUrl}/jwt/create/`, { email, password })
        );
    }

    function getUserData() {
        return createAsyncThunk(
            `${name}/getUserData/`,
            async () => await fetchWrapper.get(`${baseUrl}/details/`)
        );
    }

    function verifyToken() {
        return createAsyncThunk(
            `${name}/verifyToken`,
            async ({ token }) => await fetchWrapper.post(`${baseUrl}/jwt/verify/`, { token })
        );
    }

    function createUser() {
        return createAsyncThunk(
            `${name}/createUser`,
            async ({ username, email, phone_number, password }) => await fetchWrapper.post(`${baseUrl}/signup/`, { username, email, phone_number, password })
        );
    }
}

function createExtraReducers() {
    var authenticate = extraActions.authenticate;
    var getUserData = extraActions.getUserData;
    var verifyToken = extraActions.verifyToken;
    var createUser = extraActions.createUser;

    return builder => {
        builder.addCase(authenticate.pending, (state) => {
            state.error = null;
        })
        builder.addCase(authenticate.fulfilled, (state, action) => {
            const accessToken = action.payload.access;
            
            if (state.afterRegUser) {
                let user = {
                    ...state.afterRegUser,
                    token: accessToken
                };

                state.user = user;
                state.afterRegUser = null;

                localStorage.setItem('user', JSON.stringify(user));
                history.navigate('/');
            } else {
                state.user = {
                    ...state.user,
                    token: accessToken
                };
            }
        })
        builder.addCase(authenticate.rejected, (state, action) => {
            state.error = action.error;
        })
        builder.addCase(getUserData.pending, (state) => {
            state.error = null;
        })
        builder.addCase(getUserData.fulfilled, (state, action) => {
            const userData = action.payload;
            const user = {
                ...state.user,
                ...userData,
            };

            state.user = user;

            localStorage.setItem('user', JSON.stringify(user));
            const { from } = history.location.state || { from: { pathname: '/' } };
            history.navigate(from);
        })
        builder.addCase(getUserData.rejected, (state, action) => {
            state.error = action.error;
            state.user = null;
        })
        builder.addCase(verifyToken.pending, () => { })
        builder.addCase(verifyToken.fulfilled, () => { })
        builder.addCase(verifyToken.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.navigate('/');
        })
        builder.addCase(createUser.pending, (state) => {
            state.error = null;
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            const userData = action.payload;

            const user = {
                ...state.afterRegUser,
                ...userData,
            };

            state.afterRegUser = user;
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.error;
        })
    };
}