const flash = require('express-flash');
// const Pet = require('../models/Pet')
// const User = require('../models/User');
module.exports = class PetController{

    static showDogs(req, res){
        res.render('dogs')
    }

    static showCats(req, res){
        res.render('../views/cats')
    }

    static showFish(req, res){
        res.render('../views/fish')
    }

    static create(req, res){
        res.render('../views/pets/petsCreate')
    }

    static async createAction(req, res){

          
        const user = session.userid
                     

        console.log(user)

        const {name, breed, color, weight, genre, category, images} = req.body
        const available = true;

        // const pet = new Pet({
        //     name, 
        //     breed,
        //     color,
        //     weight,
        //     genre,
        //     category,
        //     available,
        //     images: [],
        //     user: {
        //         _id: user._id,
        //         name: user.name,
        //         phone: user.phone,
        //         image: user.image
        //     }
        // })

        // try{

        //     await pet.save()
        //     req.flash('message', 'Pet cadastrado com Sucesso.')
        //     res.redirect('user/page')

        // }catch(err){
        //     console.log(err)
        // }

        
    }

}