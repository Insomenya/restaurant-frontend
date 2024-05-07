import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from 'src/helpers';

// create slice

const name = 'menu';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const menuActions = { ...slice.actions, ...extraActions };
export const menuReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        menu: {},
        popular: {},
        modal: {
            data: null,
            loading: false,
            isModalVisible: false,
            error: null
        }
    }
}

function createReducers() {
    return {
        closeModal
    };

    function closeModal(state) {
        state.modal.isModalVisible = false;
        state.modal.data = null;
        state.modal.error = null;
    }
}

function createExtraActions() {
    const baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/menu/`;

    return {
        getMenu: getMenu(),
        getPopular: getPopular(),
        getMeal: getMeal(),
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

    function getMeal() {
        return createAsyncThunk(
            `${name}/getMeal`,
            async (mealId) => await fetchWrapper.get(`${baseUrl}${mealId}`)
        );
    }
}

function createExtraReducers() {
    var getMenu = extraActions.getMenu;
    var getPopular = extraActions.getPopular;
    var getMeal = extraActions.getMeal;

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
        builder.addCase(getMeal.pending, (state) => {
            state.modal.loading = true;
        })
        builder.addCase(getMeal.fulfilled, (state, action) => {
            let mealDetail = action.payload;

            state.modal.loading = false;
            state.modal.data = mealDetail;
            state.modal.isModalVisible = true;
        })
        builder.addCase(getMeal.rejected, (state, action) => {
            state.modal.loading = false;
            state.modal.error = action.error;
        })
    };
}