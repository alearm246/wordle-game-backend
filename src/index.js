require('dotenv').config();
const express = require("express");
const http = require("http");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const userStatsRoutes = require("./routes/userStats")
const authRoutes = require("./routes/auth");
const verifyJWT = require("./middleware/verifyJWT");
const db = require("./db/db");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}));
app.use(passport.initialize());
require("./auth/googleStrategy");

//socket events
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"]
  }
});

io.on("connection", (socket) => {
  console.log("socket is connected!");
  socket.on("lol", (string) => {
    console.log(string);
  })
})

//Routes
app.use("/auth", authRoutes);
app.use("/users", verifyJWT, userRoutes);
app.use("/users-stats", verifyJWT, userStatsRoutes);

app.get("/", (req, res) => {
  res.send("WELCOME TO WORDLE BACKEND");
});

server.listen(PORT, () => console.log(`local server running on ${PORT}`));