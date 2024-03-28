import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
// import { otherReducer } from "./reducers/otherReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
// import { commentReducer } from "./reducers/commentReducer";
// import { wishlistReducer } from "./reducers/wishlistReducer";
// import { chatReducer } from "./reducers/chatReducer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        // other: otherReducer,
        product: productReducer,
        cart: cartReducer,
        // comment: commentReducer,
        // wishlist: wishlistReducer,
        // chat: chatReducer
    },
});
//Deployed server
export const server = "https://barknmeow-backend.onrender.com/api/v1"

// export const server = "http://192.168.100.3:5000/api/v1"