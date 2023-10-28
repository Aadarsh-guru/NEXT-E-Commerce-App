import mongoose from "mongoose";

const otpScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
})

const OTP = mongoose.models.otps || mongoose.model('otps', otpScheme);

export default OTP;