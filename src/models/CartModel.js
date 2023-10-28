import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
    },
    products: [
        {
            id: {
                type: mongoose.Schema.ObjectId,
                ref: 'products'
            },
            title: {
                type: String,
                required: true,
            },
            subTitle: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
        }
    ]
}, { timestamps: true });

const Cart = mongoose.models.cartItems || mongoose.model("cartItems", cartSchema);

export default Cart;