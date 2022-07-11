const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
app.use(express.urlencoded({ extended: true}));
app.use(express.static("images"));

//configure database and mongoose
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
})
.then(() => console.log('connected to db'))
.catch(err => console.log(err))
// db configuaration ends here

//registering cors
app.use(cors());

const userRoutes = require("./routes/routes.js");
app.use("/api/posts", userRoutes);


  app.use(express.static(__dirname + "/dist/"))
  app.get("*" , (req,res) => {
      res.sendFile(__dirname + "/dist/index.html");
  });


app.listen(PORT, () => {
  console.log(`App is running on`, PORT);
});