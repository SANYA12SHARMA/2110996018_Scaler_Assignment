import Cabs from "../models/CabSchema.js"
export const findCab = async (req,res) => {
    try{
        const cabs = await Cabs.find();
        res.status(200).json(cabs);
    }catch(error){
        res.status(500).json({error:'Internal Server Error in fetching Cabs'});
    }

}