# Cab System Web Application

<p>
<img src="https://img.shields.io/badge/ReactJS-blue?logo=react"
<img src="https://img.shields.io/badge/Backend-NodeJS-green?logo=node.js">
<img src="https://img.shields.io/badge/DataBase-MongoDB-lightgreen?logo=mongoDB">
</p>

## Description
This web application serves as a cab booking system where users can easily book cabs to travel from one location to another. The system calculates the shortest time and estimated cost for the journey based on the user's input.
The shortestPath.java file contains the implementation of Dijkstra's algorithm to calculate the shortest path between source and destination. It utilizes a graph representation and priority queue implementation.It is called from the Node.js application using the child_process module. The script takes the source and destination as input arguments and returns the result to the Node.js application.

##  Features
- Cab Booking Management: Users can book cabs by providing their email, source, and destination.
- Shortest Route Calculation: The system calculates the shortest possible time from the source to the destination using an efficient route algorithm.
- Multiple Cab Options: There are 5 cabs available, each with different pricing per minute.
- No Overlapping Bookings: The system ensures that no cab has overlapping start and end times to avoid double bookings.
- Estimated Cost Calculation: Users are provided with an estimated cost based on the chosen cab and the time taken to reach the destination.
- Cab Booking Tracking: The system tracks cab bookings for reference and management.

## Usage
### Booking a Cab:
- Users enter their email, source, and destination to book a cab.
- The system calculates the shortest route and estimated cost.
### Viewing and Editing Cabs:
- Admins can access a dashboard to view and edit cab details and pricing.
- Changes made to cab details are reflected in the booking process.

## Technologies Used
### Frontend:
- HTML, CSS, JavaScript
- React.js for dynamic user interface
### Backend:
- Node.js with Express.js framework
- MongoDB for database management

## Getting Started
## #clone or download
```terminal
$ git clone https://github.com/SANYA12SHARMA/2110996018_Scaler_Assignment.git
$ cd client(ReactJs),cd server(NodeJs)
$ yarn # or npm i
```

notice, you need client and server runs concurrently in different terminal session, in order to connect them.

### Client-side usage(PORT: 3000)

### Server-side usage(PORT: 5000)

### Prepare your secret: You need to add a mongoose Connection String in .env to connect to MongoDB




