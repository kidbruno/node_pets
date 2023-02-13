const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('express-flash')
const session = require('express-session')

const app = express()

//routes
const userRoutes = require('./routes/userRoutes')
const petsRoutes = require('./routes/petsRoutes')

const mongoose = require('./db/conn')

//handlebars
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//read body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//static
app.use(express.static('public'))

//session
app.use(session({ 
    cookie: { maxAge: 60000 }, 
    name: 'session_pets',
    secret: 'canil_project',
    resave: false, 
    saveUninitialized: false})
);

//flash message
app.use(flash())

//set session to res
app.use((req, res, next) => {

    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})

//routes
app.use('/user', userRoutes)
app.use('/pets', petsRoutes)

app.get('/', (req, res) =>{
    res.render('../views/index')
})

app.listen(3000)