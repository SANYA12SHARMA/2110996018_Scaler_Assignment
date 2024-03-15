import mongoose from "mongoose"
const BookingSchema = new mongoose.Schema({
    cabName:{
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
    userEmail:{ type : String},
    userBookingTime:{
        type:Date,
        default:Date.now
    }

});
export default mongoose.model("Booking",BookingSchema);