const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config()
const bodyparser = require("body-parser");


const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");
const routes= require("./routes/routes");

const app=express();

app.use(express.json());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));


app.use(cors({
    origin: "*"
}));


app.get("/", (req, res)=> {
    res.json({message: "Ok"});
});

app.use("/api", routes);

app.all("*", (req, res, next)=> {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
})

app.use(errorHandler);

mongoose.connect(process.env.MONGOURI).then(()=>{
    app.listen(5000);
    console.log("Listening on port 5000");
}).catch(err=> {
    console.log("Not connected to database");
})