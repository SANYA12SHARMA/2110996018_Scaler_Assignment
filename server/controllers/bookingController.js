import CabUsers from '../models/CabUserSchema.js';
import Booking from '../models/BookingSchema.js';
const dateObject = new Date(); // creating date and time object for the timestamp
// Function to compare booking times
function isWithinSameHour(bookingTime1, bookingTime2, totalTime) {
    const [hour1, minute1] = bookingTime1.split(':').map(Number);
    const [hour2, minute2] = bookingTime2.split(':').map(Number);
    
    if (hour1 === hour2) {
        const ansTime = (hour2 * 60 + minute2) - (hour1 * 60 + minute1);
        return ansTime < totalTime;
    }
    return false;
}
export const book = async (req, res) => {
    const { userEmail, userCabData, totalTime, totalPrice, source, destination } = req.body;
        // Extract individual date components
const year = dateObject.getFullYear();
const month = ('0' + (dateObject.getMonth() + 1)).slice(-2); // Add leading zero if needed
const date = ('0' + dateObject.getDate()).slice(-2); // Add leading zero if needed
const hours = ('0' + dateObject.getHours()).slice(-2); // Add leading zero if needed
const minutes = ('0' + dateObject.getMinutes()).slice(-2); // Add leading zero if needed
const seconds = ('0' + dateObject.getSeconds()).slice(-2); // Add leading zero if needed

// Construct the timestamp string
const timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
userCabData["userBookingTime"] = timestamp;
        userCabData["totalTime"] = totalTime;
        userCabData["totalPrice"] = totalPrice;
        userCabData["source"] = source;
        userCabData["destination"] = destination;
    try{
        let existingUser = await CabUsers.findOne({ userEmail:userEmail });
        if (!existingUser) {
            // Create new user
            await CabUsers.create({ userEmail: userEmail });
        } else {
            // Check if user is already in a cab
            const lastBookingTime = existingUser.userCabData.length > 0 ? existingUser.userCabData[existingUser.userCabData.length - 1].userBookingTime : '';
            if (isWithinSameHour(lastBookingTime, timestamp, req.body.totalTime)) {
                res.status(200).send({ message: "Already In a Cab!!", data: false });
                return;
            }
        }

        // Update user's cab section
        await CabUsers.findOneAndUpdate({ userEmail: userEmail }, { $push: { userCabData: userCabData } });
        if(!Booking.findOne({userEmail:userEmail})){
            await Booking.create({
                cabName: userCabData["cabName"],
                cabPrice: userCabData["totalPrice"],
                cabImage: userCabData["cabImage"],
                cabType: userCabData["cabType"],
                cabSeats: userCabData["cabSeats"],
                userEmail: userEmail,
            });
        }else{
            await Booking.findOneAndUpdate({ userEmail: userEmail},{$set:{cabName: userCabData["cabName"],
            cabPrice: userCabData["totalPrice"],
            cabImage: userCabData["cabImage"],
            cabType: userCabData["cabType"],
            cabSeats: userCabData["cabSeats"],}})
        }
        

        // if (!existingUser) {
        //     existingUser = await CabUsers.create({ userEmail: userEmail  });
        // }
        // const userUpdateQuery = { userEmail: userEmail };
        // const userUpdateOperation = { $push: { userCabData: userCabData } };
        // await CabUsers.findOneAndUpdate(userUpdateQuery, userUpdateOperation);
        // await Booking.create({
        //     cabName: userCabData["cabName"],
        //     cabPrice: userCabData["totalPrice"],
        //     cabImage: userCabData["cabImage"],
        //     cabType: userCabData["cabType"],
        //     cabSeats: userCabData["cabSeats"],
        //     userEmail: userEmail,
        //     userBookingTime: timestamp
        // });

        res.status(200).send({ message: existingUser ? "UpdateSuccess" : "InsertUpdateSuccess", data: userEmail });
    } catch (error) {
        console.error("Error in bookCab:", error);
        res.status(404).json({ message: error.message });
    }
};
