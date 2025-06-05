const mongoose = require("mongoose");

const connectToDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/short-url").then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        console.log(err);
    })
}


module.exports = connectToDB;