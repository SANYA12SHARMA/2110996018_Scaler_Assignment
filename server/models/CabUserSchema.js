import mongoose from "mongoose";
const CabUserSchema = new mongoose.Schema({
    userEmail : { type : String},
    userCabData : {
        type:[Object],
    }
});

export default mongoose.model("CabUsers", CabUserSchema);