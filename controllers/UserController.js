const User = require('../models/User')
const Pets = require('../models/Pet')
const bcrypt = require('bcrypt')
const { imageUpload } = require('../helpers/imageUpload')
const fs = require('fs')
const path = require("path")
// const ObjectId = require('mongoose').Types.ObjectId

module.exports = class UserController{

    static create(req, res){
        res.render('../views/users/userCreate')
    }

    static async createAction(req, res){
        
        const {name, email, password, conf_password, phone} = req.body

        let image = ''

        if(req.file){
            image = req.file.filename 
            console.log(image)
        }

        const userConf = await User.findOne({'email': email})

        if(userConf){
            req.flash('message', 'E-mail já cadastrado no sistema, por favor escolha outro!')
            res.render('../views/users/userCreate')
            return
        }

        if(password != conf_password){
            req.flash('message', 'Senha e confirmar senha não conferem. ')
            res.render('../views/users/userCreate')
            return
        }

        // bcrypt - estudar mais precisei de ajuda
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const usuario = new User ({
            name,
            email,
            password: passwordHash,
            phone,
            image: image
        })

        try{
            await usuario.save()

            //inicializando session
            req.session.userid = usuario._id

            req.flash('message', 'Usuário Cadastrado com Sucesso.')

            //garantindo que a session do usuario ta sendo salva antes de redireciona-lo
            req.session.save(() => {
                res.redirect(`/user/page/${req.session.userid }`)
            })

        }catch(err){
            console.log(err)
        }
    }

    static login(req, res){
        res.render('../views/users/userLogin')
    }

    static async loginAction(req, res){
        
        const {email, password} = req.body

        const userConf = await User.findOne({email: email})
        
        if(! userConf){
            req.flash('message', 'E-mail errado e/ou não existe.')
            res.render('../views/users/userLogin')
            return
        }
        
        const passwordMatch = bcrypt.compareSync(password, userConf.password)

        if(passwordMatch == false){
            req.flash('message', 'Senha incorreta.')
            res.render('../views/users/userLogin')
            return
        }

        req.session.userid = userConf._id

        req.flash('message', 'Usuário Logado.')
        req.session.save(() => {
            res.redirect(`/user/page/${req.session.userid}`)
        })

    }

    static async userPage(req, res) {

        const id = req.params.id
        const user = await User.findById(id).lean()

        const userPets = await Pets.find({ 'user._id': user._id}).lean()

        if(!userPets){
            req.flash('message', 'Pet não encontrado.')
            res.render('../views/users/userPage')
            return
        }
       
        res.render('../views/users/userPage', {user, userPets})
    }

    static async edit(req, res){

        const id = req.session.userid
        
        try{
            const user = await User.findById({_id: id}).lean()
            console.log(user)
            res.render('../views/users/userEdit', {user})
        
        }catch(err){
            console.log(err)
        }
        
        
       
    }

    static async logout(req, res){

        if(req.session.userid){
            req.session.destroy()
            res.redirect('/user/login')
        }
    }

    static async editAction(req, res){

        console.log("chegou no metodo edit")
        const {id, name, phone, image} = req.body

        await User.updateMany(
            {_id: id},
            {
                name, 
                phone, 
                image
            }
        )

        res.render('../views/users/userPage')
    }
}
