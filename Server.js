require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected"));

app.use("/books", require("./routes/bookRoutes"));

app.get("/", (req, res) => {
  res.redirect("/books");
});

app.listen(3000, () => console.log("Server running on port 3000"));
