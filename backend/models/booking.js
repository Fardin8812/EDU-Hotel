import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number, // Ensure this is a Number
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;