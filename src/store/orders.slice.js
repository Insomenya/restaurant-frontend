import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history, fetchWrapper } from 'src/helpers';

// create slice

const name = 'orders';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const ordersActions = { ...slice.actions, ...extraActions };
export const ordersReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        orders: []
    }
}

function createExtraActions() {
    const baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/orders`;

    return {
        getOrders: getOrders(),
        placeOrder: placeOrder()
    };

    function getOrders() {
        return createAsyncThunk(
            `${name}/getOrders`,
            async () => await fetchWrapper.get(`${baseUrl}/`)
        );
    }

    function placeOrder() {
        return createAsyncThunk(
            `${name}/placeOrder`,
            async (orderDetails) => await fetchWrapper.post(`${baseUrl}/create/`, orderDetails)
        );
    }
}

function createExtraReducers() {
    var getOrders = extraActions.getOrders;
    var placeOrder = extraActions.placeOrder;

    return builder => {
        builder.addCase(getOrders.pending, (state) => {
            state.error = null;
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.error = action.error;
        })
        builder.addCase(placeOrder.pending, (state) => {
            state.error = null;
        })
        builder.addCase(placeOrder.fulfilled, () => {
            history.navigate('/profile');
        })
        builder.addCase(placeOrder.rejected, (state, action) => {
            state.error = action.error;
        })
    };
}