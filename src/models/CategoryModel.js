import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    products: [
        {
            type: mongoose.Types.ObjectId
        }
    ]
}, { timestamps: true })

const Category = mongoose.models.categories || mongoose.model('categories', categorySchema);

export default Category;;