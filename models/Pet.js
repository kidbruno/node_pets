//require mongoose
const mongoose = require('mongoose')
const { Schema } = mongoose

//define a schema
const PetSchema = new mongoose.Model(
    
    'Pet',
    new Schema({
        breed: {type: String, required: true},
        color: {type: Number, required: true},
        genre: {type: String, required: true},
        weight: {type: Number, required: true},
        category: {type: String, required: true},
        images: {type: Array, required: true},
        available: {type: Boolean},
        user: Object,
        adopter: Object
    },
    {timestamps: true}
    )
)

//available status do pet. Se está adotado ou não 

module.exports = PetSchema