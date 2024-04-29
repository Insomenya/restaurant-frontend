import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from 'src/helpers';

// create slice

const name = 'menu';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const menuActions = { ...slice.actions, ...extraActions };
export const menuReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        menu: {}
    }
}

function createExtraActions() {
    const baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/menu/`;

    return {
        getMenu: getMenu()
    };

    function getMenu() {
        return createAsyncThunk(
            `${name}/getMenu`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
}

function createExtraReducers() {
    var { pending, fulfilled, rejected } = extraActions.getMenu;

    return builder => {
        builder.addCase(pending, (state) => {
            state.menu = { loading: true };
        })
        builder.addCase(fulfilled, (state, action) => {
            state.menu = action.payload;
            console.log(state.menu)
        })
        builder.addCase(rejected, (state, action) => {
            state.menu = { error: action.error };
        })
    };
}