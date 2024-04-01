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

        .addCase("addCategoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("addCategorySuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("addCategoryFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
        //Delete category
        .addCase("deleteCategoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("deleteCategorySuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("deleteCategoryFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
        // Update Category
        .addCase("updateCategoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateCategorySuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateCategoryFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
        //Update Category Images
        .addCase("updateCategoryImageRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateCategoryImageSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateCategoryImageFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
        //Delete Category Images
        .addCase("deleteCategoryImageRequest", (state) => {
            state.loading = true;
        })
        .addCase("deleteCategoryImageSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("deleteCategoryImageFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
        //Get Category
        .addCase("getCategoryDetailsRequest", (state) => {
            state.loading = true;
        })
        .addCase("getCategoryDetailsSuccess", (state, action) => {
            state.loading = false;
            state.category = action.payload;
        })
        .addCase("getCategoryDetailsFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //  UPDATE PROFILE
        .addCase("updateProfileRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateProfileSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateProfileFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // UPDATE PASSWORD
        .addCase("updatePasswordSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updatePasswordFail", (state, action) => {
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



