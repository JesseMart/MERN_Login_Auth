const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();
const cors = require("cors");


// MiddleWare
app.use(express.json())
app.use(
    express.urlencoded({
        extended : false
    })
);
app.use(cors())

//DB Config
const db = require("./config/keys").mongoURI;

//Connection to MongoDB
mongoose
    .connect( db, { useNewUrlParser : true })
    .then(() => console.log("MongoDB succesfully connected."))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen( port, () => console.log(`Server Is Running on Port ${port} !`));
