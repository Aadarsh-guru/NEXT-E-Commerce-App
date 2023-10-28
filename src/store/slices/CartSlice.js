import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductsInCart: (state, action) => {
            state.products = action.payload;
        }
    }
})

export const { addProductsInCart } = cartSlice.actions;
export default cartSlice.reducer;