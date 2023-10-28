import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './slices/WishlistSlice'
import cartSlice from './slices/CartSlice';

const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        cart: cartSlice
    }
})

export default store;