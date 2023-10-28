import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addProducts: (state, action) => {
            state.products = action.payload;
        }
    }
})

export const { addProducts } = wishlistSlice.actions;
export default wishlistSlice.reducer;