const flash = require('express-flash')
const Pet = require('../models/Pet')
const User = require('../models/User')
// const { imageUpload } = require('../helpers/imageUpload')
module.exports = class PetController{

    static showDogs(req, res){
        res.render('../views/pets/dogs')
    }

    static showCats(req, res){
        res.render('../views/pets/cats')
    }

    static showFish(req, res){
        res.render('../views/pets/fish')
    }

    static create(req, res){

        const id = req.params.id
        res.render('../views/pets/petsCreate', {id})
    }

    static async createAction(req, res){

        const id = req.body.id
        const user = await User.findById(id)

        const {name, breed, color, weight, genre, category} = req.body
        const images = req.files
        const available = true
        const adopter = false

        const pet = new Pet({
            name, 
            breed,
            color,
            weight,
            genre,
            category,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                image: user.image
            },
            adopter,
        })

        //conf pr salvar img
        // images.map((image) => {
        //     pet.images.push(image.filename)
        // })

        try{
            await pet.save()
            req.flash('message', 'Pet cadastrado com Sucesso.')
            res.redirect(`/user/page/${id}`)

        }catch(err){
            console.log(err)
        }

        
    }

    static async editPet(req, res){

        const id = req.params.id
        const pet = await Pet.findById(id).lean()
        
        const userPetID = pet.user._id

        res.render('../views/pets/petDetails', {pet, userPetID})
    }

    static async updatePet(req, res){

        const id_user = req.body.id_user
        const id_pet = req.body.id_pet

        const {name, breed, color, weight} = req.body
  
        const pet = await Pet.updateMany(
            {_id: id_pet},
            {
                name,
                breed,
                color,
                weight

            }
        )

        res.redirect(`/user/page/${id_user}`)

    }

    static async delete(req, res){

        const petId = req.params.id
        const userId = req.body.user_id

        await Pet.deleteOne({petId})
        res.redirect(`/user/page/${userId}`)
    }

}