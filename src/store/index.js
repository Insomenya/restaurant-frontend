import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { menuReducer } from './menu.slice';
import { ordersReducer } from './orders.slice';

export * from './auth.slice';
export * from './menu.slice';
export * from './orders.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        orders: ordersReducer
    },
});