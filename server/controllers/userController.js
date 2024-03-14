import CabUsers from '../models/CabUserSchema.js';
export const userData = async(req,res) => {
    try {
        const users = await CabUsers.find();
        if (users.length > 0) {
            res.status(200).send({ message: "fetchSuccess", data: users });
        } else {
            res.status(200).send({ message: "fetchFailed", data: {} });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}