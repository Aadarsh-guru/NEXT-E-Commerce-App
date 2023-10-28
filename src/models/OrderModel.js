import mongoose from "mongoose";
import { addressSchema } from "./AddressModel";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    address: addressSchema,
    status: {
        type: String,
        enum: ['shipped', 'delivered', 'placed', 'canceled'],
        default: 'placed'
    },
    orderId: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    product: {
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
}, { timestamps: true });

const Order = mongoose.models.orders || mongoose.model('orders', orderSchema);

export default Order;