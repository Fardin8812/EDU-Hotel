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

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("roomId").populate("userId");
    return res.status(200).json({ bookings });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete("/delete-booking/", async (req, res) => {

  const { id } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await booking.deleteOne();
    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


export default router;