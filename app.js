const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const User = require('./models/user')

const AuthRoute = require('./routes/auth')

//MongoDB Connection
const dbURI = "mongodb+srv://rayray33:pokerchamp@nodetuts.ilwsd.mongodb.net/note-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => app.listen(port, function(){
                                console.log("Listening at port " + port)
                          }))
        .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))     //Parse form
app.use(bodyParser.json())                           //Parse json
app.use(express.static(path.join(__dirname, "./")))  //static folder

app.use(express.urlencoded({ extended: true }))

app.get('/users', (req, res) => {
        const user = new User({
                email: 'raymund@gmail',
                password: 'poker',
                name: 'pogi'
        })

        user.save()
                .then((result) => {
                        res.send(result)
                })
                .catch((err) => {
                        console.log(err)
                })
})

//http://localhost:3000/
app.get("/", function(req, res){
        res.render('index')
})

//http://localhost:3000/gallery
app.get("/gallery", function(req, res){
        res.render('gallery')
})

//http://localhost:3000/details
app.get("/details", function(req, res){
        res.render('details')
})

//http://localhost:3000/about
app.get("/about", function(req, res){
        res.render('about')
})

//http://localhost:3000/login
app.get("/login", function(req, res){
        res.render('login')
})

app.post('/login', (req, res) => {
        const user = new User(req.body)

        user.save()
                .then((result) => {
                        res.redirect("/")
                })
                .catch((err) => {
                        console.log(err)
                })
})

app.use('/login', AuthRoute)

//404 error page
app.use((req, res) => {
        res.render("404")
});