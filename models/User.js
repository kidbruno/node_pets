const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new mongoose.model(

    'User',
    new Schema({
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        phone: {type: Number},
        image: {type: String}
    },
    {timestamps: true}
    )
)

module.exports = User