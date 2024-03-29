import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    chartData: [],
    chartData2: [],
    chartData3: [],
    users: [],
    user: {},
    loading: false,
    error: null,
    category: {},
};

export const otherReducer = createReducer(initialState, (builder) => {
    builder
    // START UPDATE PIC
        .addCase("updatePicRequest", (state) => {
            state.loading = true;
        })
        .addCase("updatePicSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updatePicFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    // END UPDATE PIC
    builder.addCase("clearError", (state) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
});
