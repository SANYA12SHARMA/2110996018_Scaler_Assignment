import mongoose from "mongoose";
const CabSchema = new mongoose.Schema({
    cabName: {
        type: String,

    },
    cabPrice: {
        type: Number,
     
    },
    cabImage: {
        type: String,

    },
    cabSeats: {
        type: Number,

    },
})

export default mongoose.model("Cabs",CabSchema);