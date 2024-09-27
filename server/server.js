import express from "express";
import bodyParser from "body-parser";
import * as fs from "fs"; 
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;
const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_APP,
  password: process.env.AWS_RDS_PASS,
  port: process.env.DB_PORT || 5432,
  ssl: {
            rejectUnauthorized: false,
            ca: fs.readFileSync('./eu-west-3-bundle.pem').toString(), // Use the path to your certificate file
        },
});


db.connect();

// const url = require('url');

// const config = {
//     user: "avnadmin",
//     password: process.env.DB_PASS,
//     host: "pg-hotel-app-hotel-app-db.k.aivencloud.com",
//     port: process.env.DB_PORT,
//     database: "defaultdb",
//     ssl: {
//         rejectUnauthorized: false,
//         ca: fs.readFileSync('./ca.pem').toString(), // Use the path to your certificate file
//     },
// };

// const db = new pg.Client(config);
// db.connect(function (err) {
//     if (err)
//         throw err;
//     db.query("SELECT VERSION()", [], function (err, result) {
//         if (err)
//             throw err;

//         console.log(result.rows[0].version);
//         db.end(function (err) {
//             if (err)
//                 throw err;
//         });
//     });
// });

app.use(bodyParser.json());

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Use CORS to handle cross-origin requests

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Access denied, token missing!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user; // Store the user in the request object
    next(); // Pass control to the next handler
  });
};

// Sign Up endpoint
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkResult = await db.query("SELECT * FROM users where email=$1", [
      email,
    ]);
    if (checkResult.rows.length > 0) {
      res.status(409).json({message:"email already exists"});
    } else {
      // Hash the password using bcrypt
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          //("error hashing password", err);
          res.status(500).json({ message: "Server Error Pls try again later" });
        } else {
          const result = await db.query(
            "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3)",
            [name, email, hash]
          );
          const userResult = await db.query("SELECT user_id, user_name, wish_list FROM users WHERE email = $1", [
      email,
    ]);
          const user = userResult.rows[0];
          // delete user.password;
          const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res
            .status(201)
            .json({ message: "Registration successful", token, user });
        }
      });
    }
  } catch (e) {
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //(email, password); // Debugging logs - remove or use a logger in production

  try {
    const result = await db.query("SELECT user_id, user_name, password, wish_list FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const user = result.rows[0];
    const hash = user.password;

    bcrypt.compare(password, hash, function (err, isMatch) {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (isMatch) {
        // Passwords match
        delete user.password;
        //("Login successful");
        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        const wishList = user.wish_list || [];
        delete user.wish_list;
        res
          .status(200)
          .json({ message: "Logged in successfully", token, user, wishList });
      } else {
        // Passwords do not match
        //("Incorrect password");
        return res.status(400).json({ message: "Incorrect password" });
      }
    });
  } catch (e) {
    console.error("Error executing query:", e.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// In your Express backend (e.g., `server.js`)
app.get("/listings", async (req, res) => {
  const { location, category } = req.query;

  // Base query with join between Rooms and Hotels
  let query = `
      SELECT r.*, h.hotel_name, h.hotel_location
      FROM rooms r
      JOIN hotels h ON r.hotel_id = h.hotel_id
      WHERE 1=1
  `;
  const queryParams = [];

  // Dynamically add filters to the query
  if (location) {
    queryParams.push(location);
    query += ` AND h.hotel_location = $${queryParams.length}`; // Use dynamic indexing
  }

  if (category) {
    queryParams.push(category);
    query += ` AND r.room_category = $${queryParams.length}`; // Use dynamic indexing
  }

  try {
    const results = await db.query(query, queryParams);
    res.json(results.rows);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).send("Server Error");
  }
});

app.get("/listing-details", async (req, res) => {
  const { roomId } = req.query;

  // Use parameterized queries to prevent SQL injection
  const query = `
    SELECT * 
    FROM rooms 
    INNER JOIN hotels ON rooms.hotel_id = hotels.hotel_id 
    WHERE rooms.room_id = $1
  `;

  try {
    // Use parameterized queries to safely insert roomId
    const results = await db.query(query, [roomId]);
    //(results.rows);
    res.json(results.rows);
  } catch (error) {
    console.error("Error fetching listing details", error);
    res.status(500).send("Error fetching listing details");
  }
});

app.post("/wishlist", authenticateToken, async (req, res) => {
  const { roomId } = req.body;
  const userId = req.user.id;

  try {
    const wishlist = await db.query(
      "SELECT wish_list FROM users WHERE user_id = $1",
      [userId]
    );

    const updatedUser = await db.query(
      "UPDATE users SET wish_list = array_append(COALESCE(wish_list, ARRAY[]::integer[]), $1) WHERE user_id = $2 RETURNING wish_list",
      [roomId, userId]
    );
    res.status(200).json({ updatedWishlist: updatedUser.rows[0].wish_list });
  } catch (error) {
    res.status(500).json({ message: "Error updating wishlist" });
  }
});

app.delete("/wishlist/:roomId", authenticateToken, async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user.id;

  try {
    const updatedUser = await db.query(
      "UPDATE users SET wish_list = array_remove(wish_list, $1) WHERE user_id = $2 RETURNING wish_list",
      [roomId, userId]
    );

    res.status(200).json({ updatedWishlist: updatedUser.rows[0].wish_list });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist" });
  }
});

app.post("/rooms/batch", async (req, res) => {
  const { roomIds } = req.body;
  try {
    const rooms = await db.query(
      "SELECT * FROM rooms WHERE room_id = ANY($1::int[])",
      [roomIds]
    );
    res.json(rooms.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

app.post("/bookings/create", authenticateToken, async (req, res) => {
  const { user_id, room_id, startDate, endDate, totalPrice } = req.body;

  // Validate request body
  if (!room_id || !startDate || !endDate || !totalPrice) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Step 1: Check for overlapping bookings
    const query = `
      SELECT * FROM bookings 
      WHERE room_id = $1 
      AND NOT ($2 > booking_end OR $3 < booking_start)
    `;

    const existingBookings = await db.query(query, [
      room_id,
      endDate,
      startDate,
    ]);
    if (existingBookings.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Room is already booked for the selected dates" });
    }

    // Insert booking into the bookings table
    const insertBookingQuery = `
      INSERT INTO bookings (user_id, room_id, booking_start, booking_end, total_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const newBooking = await db.query(insertBookingQuery, [
      user_id, // Extracted from the Bearer token
      room_id,
      startDate,
      endDate,
      totalPrice,
    ]);

    // Send back the newly created booking as a response
    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking.rows[0] });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/bookings/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch bookings for the given user
    const bookingsQuery = `
      SELECT * FROM bookings
      WHERE user_id = $1
    `;
    const bookingsResult = await db.query(bookingsQuery, [userId]);

    const bookings = bookingsResult.rows;

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    // Extract room IDs from the bookings
    const roomIds = bookings.map((booking) => booking.room_id);

    // Fetch room details for each room_id (use WHERE IN to get multiple rooms in one query)
    const roomsQuery = `
      SELECT * FROM rooms
      WHERE room_id = ANY($1::int[])
    `;
    const roomsResult = await db.query(roomsQuery, [roomIds]);

    const rooms = roomsResult.rows;

    // Merge the room details with the bookings
    const bookingsWithRooms = bookings.map((booking) => {
      const roomDetails = rooms.find((room) => room.room_id === booking.room_id);
      return {
        ...booking,
        ...roomDetails,  // Spread room details into the main booking object
        booking_start: new Date(booking.booking_start).toISOString().split('T')[0], // Format to YYYY-MM-DD
        booking_end: new Date(booking.booking_end).toISOString().split('T')[0], // Format to YYYY-MM-DD
      };
    });

    res.status(200).json({ bookings: bookingsWithRooms });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  //(`Server is running on port ${port}`);
});
