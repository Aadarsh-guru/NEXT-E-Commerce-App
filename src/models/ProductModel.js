import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
        }
    ],
    featured: {
        type: Boolean,
        default: false,
    },
    bestseller: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
    stock: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Product = mongoose.models.products || mongoose.model('products', productSchema);

export default Product;
