const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "erorr name"]
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
}) 

module.exports = model("users", userSchema)