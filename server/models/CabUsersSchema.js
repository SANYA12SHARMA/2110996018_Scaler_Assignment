import mongoose from "mongoose";
const CabUserSchema = new mongoose.Schema({
    userEmail:{type : String, required : true, unique : true},
    userSource:{type : String, required : true},
    userDestination:{type : String, required : true}
});

export default mongoose.model("CabUsers", CabUserSchema);