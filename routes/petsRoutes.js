const express = require('express')
const router = express.Router()
const PetController = require('../controllers/PetController')
const { imageUpload } = require('../helpers/imageUpload')

//cachorro
router.get('/dogs', PetController.showDogs)
router.get('/cats', PetController.showCats)
router.get('/fish', PetController.showFish)
router.get('/create/:id', PetController.create)
router.post('/create/', imageUpload.array('images') ,PetController.createAction)


module.exports = router