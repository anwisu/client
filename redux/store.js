import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { otherReducer } from "./reducers/otherReducer";
import { productReducer } from "./reducers/productReducer";
import { orderReducer } from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";
// import { commentReducer } from "./reducers/commentReducer";
// import { wishlistReducer } from "./reducers/wishlistReducer";
// import { chatReducer } from "./reducers/chatReducer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        other: otherReducer,
        product: productReducer,
        order: orderReducer,
        cart: cartReducer,
        // comment: commentReducer,
        // wishlist: wishlistReducer,
        // chat: chatReducer
    },
});
//Deployed server
export const server = "https://barknmeow-backend.onrender.com/api/v1"

//IP ni wanel
// export const server = "http://192.168.100.138:5000/api/v1"

// IP ni Jis
// export const server = "http://192.168.1.24:5000/api/v1"

// IP sa Kapehan
// export const server = "http://192.168.0.192:5000/api/v1"