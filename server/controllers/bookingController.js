import CabUsers from '../models/CabUserSchema.js';
import Booking from '../models/BookingSchema.js';
const dateObject = new Date(); // creating date and time object for the timestamp

export const book = async (req, res) => {
    const { userEmail, userCabData, totalTime, totalPrice, source, destination } = req.body;
        // Extract individual date components
        const hours=dateObject.getHours();
        const minutes=dateObject.getMinutes();
        const seconds=dateObject.getSeconds();
        const date=(`0 ${dateObject.getDate()}`).slice(-2);
        const month=(`0 ${dateObject.getMonth()+1}`).slice(-2);
        const year=dateObject.getFullYear();
        var timestamp=`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;  
       
        userCabData["userBookingTime"] = timestamp;
        userCabData["totalTime"] = totalTime;
        userCabData["totalPrice"] = totalPrice;
        userCabData["source"] = source;
        userCabData["destination"] = destination;
        // Function to check for overlapping bookings
async function isBookingOverlap() {
    // Calculate end time by adding total time to the start time
const endTime = new Date(dateObject.getTime() + totalTime * 60000); // totalTime is in minutes

// Query existing bookings for the cab within the specified time range
const existingBookings = await Booking.find({
cabName: userCabData.cabName,
userBookingTime: { $lt: endTime },
// Assuming you have a field userBookingTime for the start time of each booking
});

// If any overlapping booking is found, return true
return existingBookings.length > 0;
}
        // Check if the cab is already booked during the specified time range
    const isOverlap = await isBookingOverlap();
    if (isOverlap) {
        return res.status(200).send({ message: "Cab is already booked during this time.", data: false });
    }
        try{
            let existingUser = await CabUsers.findOne({ userEmail:userEmail });
        if(existingUser){
            var li=existingUser.userCabData[existingUser.userCabData.length-1]
            var li1=li.userBookingTime.split(" ")
            var li2=timestamp.split(" ")
            var t1=li1[li1.length-1] 
            var t2=li2[li2.length-1]        
            var tt1=t1.split(":")
            var tt2=t2.split(":")
            var time1=parseInt(tt1[1])
            var time2=parseInt(tt2[1])
            var hour1=parseInt(tt1[0])
            var hour2=parseInt(tt2[0])
            var ansTime=time2-time1;
            console.log("hr:",hour2-hour1);
            if(hour2===hour1)
            {

                if(ansTime<req.body.totalTime) //checking the timestamp of the user's last booking and the real time 
                {
                    res.status(200).send({message:"Already In a Cab!!",data:false})
                    return;
                }
               
            }
        }
        else {
            // Create new user
            await CabUsers.create({ userEmail: userEmail });
        } 
    

     // Update user's cab section
await CabUsers.findOneAndUpdate({ userEmail: userEmail }, { $push: { userCabData: userCabData } });

// Find the existing booking for the user
const existingBooking = await Booking.findOne({ userEmail: userEmail });

// Update or create booking
if (!existingBooking) {
    // Create new booking
    await Booking.create({
        cabName: userCabData["cabName"],
        cabPrice: userCabData["totalPrice"],
        cabImage: userCabData["cabImage"],
        cabType: userCabData["cabType"],
        cabSeats: userCabData["cabSeats"],
        userEmail: userEmail
    });
} else {
    // Update existing booking
    await Booking.findOneAndUpdate({ userEmail: userEmail }, {
        $set: {
            cabName: userCabData["cabName"],
            cabPrice: userCabData["totalPrice"],
            cabImage: userCabData["cabImage"],
            cabType: userCabData["cabType"],
            cabSeats: userCabData["cabSeats"]
        }
    });
}
        

        res.status(200).send({ message: existingUser ? "UpdateSuccess" : "InsertUpdateSuccess", data: userEmail });
    } catch (error) {
        console.error("Error in bookCab:", error);
        res.status(404).json({ message: error.message });
    }
};
