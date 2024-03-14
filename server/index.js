import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import pathRoute from './routes/findShortestPath.js';
import cabRoute from './routes/findCab.js';
import userBookingRoute from './routes/bookingCab.js';
import allBookingsRoute from './routes/allCabsBookings.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true
};

app.get('/',(req, res)=>{
    res.send('Api is working');
});

//database connection
mongoose.set('strictQuery',false)
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB database is connected')
    }catch(err){
        console.log('MongoDB database is connection failed')
    }
}

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/path',pathRoute);
app.use('/api/cab',cabRoute);
app.use('/api/user',userBookingRoute);
app.use('/api/allBookings',allBookingsRoute);

app.listen(port, ()=>{
    connectDB();
    console.log("Server is running on port "+port);
});