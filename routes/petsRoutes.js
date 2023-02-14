const express = require('express')
const router = express.Router()
const PetController = require('../controllers/PetController')

//cachorro
router.get('/dogs', PetController.showDogs)
router.get('/cats', PetController.showCats)
router.get('/fish', PetController.showFish)
router.get('/create/:id', PetController.create)
router.post('/create/', PetController.createAction)


module.exports = router