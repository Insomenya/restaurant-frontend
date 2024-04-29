import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { menuReducer } from './menu.slice';

export * from './auth.slice';
export * from './menu.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer
    },
});