const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required :[true, "Please add the user name"]
        },
        email:{
            type: String,
            required: [true, "Please enter an emil"]
        },
        phone: {
            type: String,
            required: [true, "Please enter a phone number"]
        }
    }
)

module.exports = mongoose.model("User", userSchema)