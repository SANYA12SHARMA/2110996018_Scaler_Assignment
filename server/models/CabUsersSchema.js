import mongoose from "mongoose";
const CabUserSchema = new mongoose.Schema({
    userEmail : { type : String, required : true, unique : true},
    userSource : { type : String, required : true},
    userDestination : { type : String, required : true},
    userBookingTime : { type : Date, default:Date.now},
    cabChosen : { type : String,
                  required:true,
                  enum : ['WagonR', 'Ertiga', 'Tiago','Celerio', 'Swift']},
    totalTime : { type:Number},
});

export default mongoose.model("CabUsers", CabUserSchema);