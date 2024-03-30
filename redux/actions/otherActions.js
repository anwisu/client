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

export const addCategory = (formData) => async (dispatch) => {
    try {
        dispatch({
        type: "addCategoryRequest",
        });

        const { data } = await axios.post(`${server}/category/new`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        });

        dispatch({
        type: "addCategorySuccess",
        payload: data.message,
        });
    } catch (error) {
        dispatch({
        type: "addCategoryFail",
        payload: error.response.data.message,
        });
    }
};

export const getCategoryDetails = (id) => async (dispatch) => {
    
    try {
        dispatch({
            type: "getCategoryDetailsRequest",
        })
        
        // Axios request
        const { data } = await axios.get(`${server}/category/single/${id}`, {
            withCredentials: true
        })
        
        console.log("Category details fetched successfully:", data.category);
        dispatch({
            type: "getCategoryDetailsSuccess",
            payload: data.category
        })
    } catch (error) {
        
        dispatch({
            type: "getCategoryDetailsFail",
            payload: error.response.data.message
        })
    }
}


export const updateCategory =
    (id, category) => async (dispatch) => {
        try {
        dispatch({
            type: "updateCategoryRequest",
        });
        const { data } = await axios.put(
            `${server}/category/single/${id}`,
            {
            category,
            },
            {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
            }
        );

        dispatch({
            type: "updateCategorySuccess",
            payload: data.message,
        });
        } catch (error) {
        dispatch({
            type: "updateProductFail",
            payload: error.response.data.message,
        });
        }
    };

    
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({
        type: "deleteCategoryRequest",
        });

        const { data } = await axios.delete(
        `${server}/category/single/${id}`,

        {
            withCredentials: true,
        }
        );
        dispatch({
        type: "deleteCategorySuccess",
        payload: data.message,
        });
    } catch (error) {
        dispatch({
        type: "deleteCategoryFail",
        payload: error.response.data.message,
        });
    }
};


export const updateCategoryImage = (categoryId, formData) => async (dispatch) => {
    try {
        dispatch({
        type: "updateCategoryImageRequest",
        });

        const { data } = await axios.post(
        `${server}/category/images/${categoryId}`,
        formData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
        );

        dispatch({
        type: "updateCategoryImageSuccess",
        payload: data.message,
        });
    } catch (error) {
        dispatch({
        type: "updateCategoryImageFail",
        payload: error.response.data.message,
        });
    }
};

export const deleteCategoryImage = (categoryId, imageId) => async (dispatch) => {
    try {
        dispatch({
        type: "deleteCategoryImageRequest",
        });

        const { data } = await axios.delete(
        `${server}/category/images/${categoryId}?id=${imageId}`,
        {
            withCredentials: true,
        }
        );

        dispatch({
        type: "deleteCategoryImageSuccess",
        payload: data.message,
        });
    } catch (error) {
        dispatch({
        type: "deleteCategoryImageFail",
        payload: error.response.data.message,
        });
    }
};