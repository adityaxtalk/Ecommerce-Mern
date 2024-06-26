const mongoose = require("mongoose");
const UNIQUE_VALIDATOR = require("mongoose-unique-validator");

const USER_SCHEMA = mongoose.Schema({
    
    'email': {
        type: String,
        required: true,
        unique: true
    },
    'password' : {
        type: String,
        required: true
    }
});

USER_SCHEMA.plugin(UNIQUE_VALIDATOR);

module.exports = mongoose.model("User", USER_SCHEMA);