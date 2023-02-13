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

}