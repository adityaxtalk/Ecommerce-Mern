const mongoose = require("mongoose");

const PRODUCT_SCHEMA = mongoose.Schema({
    "name" : {
        type: String
    },
    "price": {
        type: Number
    },
    "was": {
        type: Number
    },
    "weight": {
        type: String,
    },
    "pic": {
        type: String,
    },
    "popular": {
        type:  Number
    },
    "type": {
             type: String
    }
})


module.exports = mongoose.model("Product", PRODUCT_SCHEMA);