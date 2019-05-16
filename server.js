const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false })); //body parser for express

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on localhost:" + PORT));
