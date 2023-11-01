import mongoose from "mongoose";

const slidesSchema = new mongoose.Schema({
    slides: [
        {
            image: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });


const Slides = mongoose.models.slides || mongoose.model("slides", slidesSchema);

export default Slides;