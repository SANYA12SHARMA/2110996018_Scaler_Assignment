import Booking from '../models/BookingSchema.js';
export const allCabBookings =  async (req, res) => {
    try {
        const allCabBookings = await Booking.find();
        res.status(200).send(allCabBookings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};