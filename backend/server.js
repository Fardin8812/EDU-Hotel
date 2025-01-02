import express from "express";
import connection from "./db.js";
import roomsRoute from "./routes/roomsRoute.js";
import usersroute from "./routes/usersRoute.js";
import bookingsRoute from "./routes/bookingsRoute.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/users", usersroute);

connection.once("open", () => {
  console.log("Connected to MongoDB database");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const port = 5000;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(port, () =>
  console.log(`Server Started on port :${port}`)
);
