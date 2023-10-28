import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    addressDetail: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    lanndmark: {
        type: String
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

const Address = mongoose.models.addreses || mongoose.model("addreses", addressSchema);

export default Address;