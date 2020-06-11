const express = require("express");
const mongoose = require("mongoose");
require("./models/User");
require("./models/Track");

const authRouter = require("./routes/authRoutes");
const trackRouter = require("./routes/trackRoutes");
const bodyParse = require("body-parser");
const requireAuth = require("./middlewares/requiredAuth");

const app = express();
app.use(bodyParse.json());
app.use(authRouter);
app.use(trackRouter);

const mongoUri =
  "mongodb+srv://admin:Sunny@123@tracker-emkhq.mongodb.net/Tracker?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("MONGO DB Connected");
});

mongoose.connection.on("error", (err) => {
  console.error("DB CONNECTTION ERROR", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`User Email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on POST 3000");
});
