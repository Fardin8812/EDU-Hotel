import mongoose from 'mongoose';

// MongoDB Atlas connection string (corrected)
const mongoURL = "mongodb+srv://rafiul:rafiul123@cluster0.zcw1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Correct connection options
mongoose.connect(mongoURL);

// Connection object for handling connection events
const connection = mongoose.connection;

connection.on("error", (err) => {
  console.log("MongoDB Connection failed:", err.message);
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successful : Rafiul");
});

export default connection;
