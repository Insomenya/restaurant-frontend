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
        menu: {},
        popular: {}
    }
}

function createExtraActions() {
    const baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/menu/`;

    return {
        getMenu: getMenu(),
        getPopular: getPopular()
    };

    function getMenu() {
        return createAsyncThunk(
            `${name}/getMenu`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }

    function getPopular() {
        return createAsyncThunk(
            `${name}/getPopular`,
            async () => await fetchWrapper.get(`${baseUrl}popular/`)
        );
    }
}

function createExtraReducers() {
    var getMenu = extraActions.getMenu;
    var getPopular = extraActions.getPopular;

    return builder => {
        builder.addCase(getMenu.pending, (state) => {
            state.menu = { loading: true };
        })
        builder.addCase(getMenu.fulfilled, (state, action) => {
            let meals = action.payload;

            if (meals.length) {
                let mealsByCategory = [];

                let grp = meals.reduce((group, meal) => {
                    const { category_name } = meal;
                    group[category_name] = group[category_name] ?? [];
                    group[category_name].push(meal);
                    return group;
                }, {});

                let counter = 0;

                for (const obj in grp) {
                    mealsByCategory.push({
                        category_id: counter++,
                        category: obj,
                        items: grp[obj]
                    });
                }

                state.menu = {
                    meals: meals,
                    mealsByCategory: mealsByCategory
                };
            } else {
                state.menu = []
            }
        })
        builder.addCase(getMenu.rejected, (state, action) => {
            state.menu = { error: action.error };
        })
        builder.addCase(getPopular.pending, (state) => {
            state.popular = { loading: true };
        })
        builder.addCase(getPopular.fulfilled, (state, action) => {
            let popular = action.payload;

            state.popular = popular;
        })
        builder.addCase(getPopular.rejected, (state, action) => {
            state.popular = { error: action.error };
        })
    };
}