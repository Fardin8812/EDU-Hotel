import express from "express";
const router = express.Router();

import Room from "../models/rooms.js";

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.json({ rooms });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
export default router;
