import express from 'express';
const router = express.Router();
import Booking from "../models/booking.js";

router.post("/create-booking", async (req, res) => {
  const { roomId, userId, checkInDate, checkOutDate, totalAmount } = req.body;

  try {
    const newbooking = new Booking({
      roomId,
      userId,
      checkInDate,
      checkOutDate,
      totalAmount,
      createdAt: new Date(),
    });

    const booking = await newbooking.save();
    return res.status(200).json({ message: "Booking successful", booking });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;