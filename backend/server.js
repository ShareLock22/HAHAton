const authRoutes = require("./routes/auth.routes.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookingRoutes = require("./routes/booking.routes.js"); // Предполагаю, что у вас есть этот файл

const express = require("express");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5013;

// Middleware here
app.use(bodyParser.json()); // Убедитесь, что этот middleware используется
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
