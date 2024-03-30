import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer({
    orders: [],
    order: {},

}, (builder) => {
    builder
        .addCase("getOrderDetailsRequest", (state) => {
            state.loading = true;
        })
        .addCase("getOrderDetailsSuccess", (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase("getOrderDetailsFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    
    builder.addCase("clearError", (state) => {
        state.error = null;
    });
    
    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
});