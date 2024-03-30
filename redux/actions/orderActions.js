import axios from "axios";
import { server } from "../store";

export const getOrderDetails = (id) => async (dispatch) => {
    
    try {
        dispatch({
            type: "getOrderDetailsRequest",
        })

        // Axios request

        const { data } = await axios.get(`${server}/order/single/${id}`,
        
        {
            withCredentials: true
        })

        dispatch({
            type: "getOrderDetailsSuccess",
            payload: data.order
        })

    } catch (error) {
        
        dispatch({
            type: "getOrderDetailsFail",
            payload: error.response.data.message
        })
    }

}