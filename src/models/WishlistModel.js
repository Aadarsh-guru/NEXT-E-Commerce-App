import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
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
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true
            },
            discount: {
                type: Number,
                default: 0
            },
        }
    ]
}, { timestamps: true });

const Wishlist = mongoose.models.wishlists || mongoose.model("wishlists", wishlistSchema);

export default Wishlist;