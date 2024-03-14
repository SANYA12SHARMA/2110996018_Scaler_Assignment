import mongoose from "mongoose";
const CabUserSchema = new mongoose.Schema({
    userEmail : { type : String, required : true, unique : true},
    userCabData : {
        type:[Object],
    }
});

export default mongoose.model("CabUsers", CabUserSchema);