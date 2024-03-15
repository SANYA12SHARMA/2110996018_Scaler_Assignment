import CabUsers from '../models/CabUserSchema.js';
import Booking from '../models/BookingSchema.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
const dateObject = new Date(); // creating date and time object for the timestamp

dotenv.config();
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
});
export const book = async (req, res) => {
    const { userEmail, userCabData, totalTime, totalPrice, source, destination } = req.body;

    // Extract individual date components
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const date = (`0 ${dateObject.getDate()}`).slice(-2);
    const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
    const year = dateObject.getFullYear();
    const timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

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
        return res.status(200).send({ message: "This cab is already booked during this time.", data: false
     });
    }

    try {
        let existingUser = await CabUsers.findOne({ userEmail: userEmail });
        if (existingUser) {
            const lastBookingTimeArray = existingUser.userCabData[existingUser.userCabData.length - 1].userBookingTime.split(" ");
            const currentTimestampArray = timestamp.split(" ");
            // Extract hours and minutes from the last booking time and current timestamp
            const lastBookingTime = lastBookingTimeArray[lastBookingTimeArray.length - 1];
            const currentTimestamp = currentTimestampArray[currentTimestampArray.length - 1];
            // Split hours and minutes into separate variables
            const lastBookingTimeParts = lastBookingTime.split(":");
            const currentTimestampParts = currentTimestamp.split(":");
            const lastBookingMinutes = parseInt(lastBookingTimeParts[1]);
            const currentTimestampMinutes = parseInt(currentTimestampParts[1]);
            const lastBookingHours = parseInt(lastBookingTimeParts[0]);
            const currentTimestampHours = parseInt(currentTimestampParts[0]);
            // Calculate the time difference between the last booking and current timestamp
            const timeDifferenceMinutes = currentTimestampMinutes - lastBookingMinutes;
            const timeDifferenceHours = currentTimestampHours - lastBookingHours;

            console.log("timeDifferenceHours:", timeDifferenceHours);
            if (timeDifferenceHours === 0) {
                if (timeDifferenceMinutes < req.body.totalTime) {
                    res.status(200).send({ message: "You are already In a Cab!!", data: false });
                    return;
                }
            }
        } else {
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
            // Assigning main function to a variable
const main = async () => {
    try {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: process.env.USER_EMAIL, // sender address
        to: userEmail, // list of receivers
        subject: "Booking Confirmed", // Subject line
        text: `Hi this is your cab name : ${userCabData["cabName"]}`, // plain text body
      });
  
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };
  
  // Call the main function
  main().catch(console.error);
        }
        res.status(200).send({ message: existingUser ? "UpdateSuccess" : "InsertUpdateSuccess", data: userEmail });
    } catch (error) {
        console.error("Error in bookCab:", error);
        res.status(404).json({ message: error.message });
    }
};
