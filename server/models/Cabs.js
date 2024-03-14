import mongoose from "mongoose";
const CabSchema = new mongoose.Schema({
    cabName: {
        type: String,
        required: true
    },
    cabPrice: {
        type: Number,
        required: true
    },
    cabImage: {
        type: String,
        required: true
    },
    cabSeats: {
        type: Number,
        required: true
    },
})

export default mongoose.model("Cabs",CabSchema);