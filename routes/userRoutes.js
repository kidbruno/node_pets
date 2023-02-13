const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { imageUpload } = require('../helpers/image-uploads')

router.get('/create', UserController.create)
router.post('/create', imageUpload.single('image'), UserController.createAction)
router.get('/login', UserController.login)
router.post('/login', UserController.loginAction)
router.get('/logout', UserController.logout)
router.get('/page', UserController.userPage)
router.get('/edit/:id', UserController.edit)
router.post('/update', UserController.editAction)


module.exports = router