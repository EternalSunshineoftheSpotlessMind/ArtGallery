const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const cors = require("cors")
const path = require("path")
const User = require('./models/user.model')
const Artwork = require('./models/artwork.js');

//Used for login and registry
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
const config = require("./config/auth.config")

const app = express()
const port = process.env.PORT || 3000

var corsOptions = {
        origin: port
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({extended: true}))     //Parse form
app.use(bodyParser.json())                           //Parse json
app.use(express.static(path.join(__dirname, "./")))  //static folder

const db = require("./models")
const Role = db.role

//MongoDB Connection
const dbURI = "mongodb+srv://rayray33:pokerchamp@nodetuts.ilwsd.mongodb.net/note-tuts?retryWrites=true&w=majority";
db.mongoose
        .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
                console.log("Connected to DB")
                initial()
        })
        .catch(err => {
                console.error("Connection error", err)
                process.exit()
        })

//Add to db collection
function initial(){
        Role.estimatedDocumentCount((err, count) => {
                if(!err && count === 0){
                        new Role({
                                name: "user"
                        }).save(err => {
                                if(err){
                                        console.log("Error", err)
                                }
                                console.log("added 'user' to roles collection")
                        })
                        new Role({
                                name: "admin"
                        }).save(err => {
                                if(err){
                                        console.log("Error", err)
                                }
                                console.log("added 'admin' to roles collection")
                        })
                }
        })
}

//register view engine
app.set('view engine', 'ejs')

//http://localhost:3000/
app.get("/", function(req, res){
        res.render('index')
})

//http://localhost:3000/gallery
app.get("/gallery", function(req, res, next){
        Artwork.find({},' ',function(err, docs) {
          var artworkChunks = [];
          var chunkSize = 2;
          for (var i = 0; i < docs.length; i += chunkSize){
            artworkChunks.push(docs.slice(i, i + chunkSize));
          }
          console.log(docs);
          res.render('gallery', { main: 'Purchase', docs: docs });
        });
});

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
        User.findOne({
                name: req.body.name
        })
        
        .exec((err, user) => {
                if(err){
                    res.status(500).send({message: err})
                    return
                }
                if(!user){
                    return res.status(404).send({message: "User not found"})
                }
        
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                )
        
                if(!passwordIsValid){
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid password"
                    })
                }
        
                var token = jwt.sign({id: user.id}, config.secret, {
                    expiresIn: 86400
                })

                res.status(200).send({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        accessToken: token
                })
        })
        
})

//http://localhost:3000/register
app.get("/register", function(req, res){
        res.render('register')
})

app.post('/register', (req, res) => {
        const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)
        })

        user.save()
                .then((result) => {
                        res.redirect("/")
                })
                .catch((err) => {
                        console.log(err)
                })
})

// require("./routes/auth.routes")
// require("./routes/user.routes")

app.listen(port, function(){
        console.log("Listening at port " + port)
})

//404 error page
app.use((req, res) => {
        res.render("404")
});