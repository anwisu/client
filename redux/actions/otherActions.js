import axios from "axios";
import { server } from "../store";

export const updatePic = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "updatePicRequest",
        });

        const { data } = await axios.put(
            `${server}/user/updatepic`,

            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        dispatch({
            type: "updatePicSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "updatePicFail",
            payload: error.response.data.message,
        });
    }
};