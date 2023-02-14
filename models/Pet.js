//require mongoose
const mongoose = require('mongoose')
const { Schema } = mongoose

//define a schema
const Pet = new mongoose.model(
    
    'Pet',
    new Schema({
        name:  {type:String, required: true},
        breed: {type: String, required: true},
        color: {type: String, required: true},
        genre: {type: String, required: true},
        weight: {type: Number, required: true},
        category: {type: String, required: true},
        images: {type: Array},
        available: {type: Boolean},
        user: Object,
    },
    {timestamps: true}
    )
)

//available status do pet. Se está adotado ou não 

module.exports = Pet