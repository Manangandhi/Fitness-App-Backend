require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Api Working" });
});

const user = require("./routes/authentication");
app.use("/user", user);

const port = 5000;
app.listen(port, () => console.log(`Server Started at Port ${port}`));
