import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
    {
        cartItems: [],
        loading: false,
        error: null,
        user: {},
    },
    (builder) => {
        builder
            .addCase("addToCart", (state, action) => {
                const item = action.payload;
                const isExist = state.cartItems.find((i) => i.product === item.product);
                if (isExist) {
                    state.cartItems = state.cartItems.filter((i) =>
                        i.product === isExist.product ? item : i
                    );

                    for (let i = 0; i < state.cartItems.length; i++) {
                        if (state.cartItems[i].product === isExist.product)
                            state.cartItems[i] = item;
                    }
                } else state.cartItems.push(item);
            })
            .addCase("removeFromCart", (state, action) => {
                const id = action.payload;
                state.cartItems = state.cartItems.filter((i) => i.product !== id);
            })
            .addCase("clearCart", (state) => {
                state.cartItems = [];
            })
            .addCase("placeOrderRequest", (state) => {
                state.loading = true;
            })
            .addCase("processOrderRequest", (state) => {
                state.loading = true;
            })
            .addCase("placeOrderSuccess", (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase("placeOrderFail", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase("processOrderSuccess", (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase("processOrderFail", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
);