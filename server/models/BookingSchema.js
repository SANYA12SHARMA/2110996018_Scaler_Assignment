import mongoose from "mongoose"
const BookingSchema = new mongoose.Schema({
    cabName:{
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
    userEmail:{ type : String, required : true, unique : true},
    userBookingTime:{
        type:Date,
        default:Date.now
    }

});
export default mongoose.model("Booking",BookingSchema);