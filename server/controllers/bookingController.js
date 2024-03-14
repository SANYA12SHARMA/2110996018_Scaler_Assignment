import CabUsers from '../models/CabUserSchema.js';
import Booking from '../models/BookingSchema.js';
export const bookCab = async (req,res) => {
    try{
        const { userEmail, userCabData, totalTime, totalPrice, source, destination } = req.body;
        const timestamp = new Date().toISOString();

        userCabData["userBookingTime"] = timestamp;
        userCabData["totalTime"] = totalTime;
        userCabData["totalPrice"] = totalPrice;
        userCabData["source"] = source;
        userCabData["destination"] = destination;

        const existingUser = await CabUsers.findOne({ userEmail });
        if (!existingUser) {
            await CabUsers.create({ userEmail: userEmail  });
        }
        const userUpdateQuery = { userEmail: userEmail };
        const userUpdateOperation = { $push: { userCabData: userCabData } };
        await CabUsers.findOneAndUpdate(userUpdateQuery, userUpdateOperation);
        await Booking.create({
            cabName: userCabData["cabName"],
            cabPrice: userCabData["totalPrice"],
            cabImage: userCabData["cabImage"],
            cabType: userCabData["cabType"],
            cabSeats: userCabData["cabSeats"],
            userEmail: userEmail
        });
        res.status(200).send({ message: existingUser ? "UpdateSuccess" : "InsertUpdateSuccess", data: userEmail });
    }catch (error) {
        console.error("Error in bookCab:", error);
        res.status(404).json({ message: error.message });
    }
}