import axios from "axios";
import { server } from "../store";

export const placeOrder =
    (
        orderItems,
        shippingInfo,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        paymentInfo
    ) =>
        async (dispatch) => {
            try {
                dispatch({
                    type: "placeOrderRequest",
                });

                const { data } = await axios.post(
                    `${server}/order/new`,
                    {
                        shippingInfo,
                        orderItems,
                        paymentMethod,
                        paymentInfo,
                        itemsPrice,
                        taxPrice,
                        shippingCharges,
                        totalAmount,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                dispatch({
                    type: "placeOrderSuccess",
                    payload: data.message,
                });
            } catch (error) {
                dispatch({
                    type: "placeOrderFail",
                    payload: error.response.data.message,
                });
            }
        };

export const processOrder = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "processOrderRequest",
        });

        const { data } = await axios.put(
            `${server}/order/single/${id}`,

            {},
            {
                withCredentials: true,
            }
        );
        dispatch({
            type: "processOrderSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "processOrderFail",
            payload: error.response.data.message,
        });
    }
};