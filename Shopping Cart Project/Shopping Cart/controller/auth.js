const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const User = require("../model/user")
const jwt = require("jsonwebtoken")
const config = require("../config")
const LocalStorage = require("node-localstorage").LocalStorage
localStorage = new LocalStorage("../scratch")



exports.postRegister=(req,res)=>{
    const role = 'user';
    const hashedPassword = bcrypt.hashSync(req.body.password, 8)
    console.log(hashedPassword)
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role:role
    }).then((registeredUser) => {
        console.log("registeredUser", registeredUser)
        var token = jwt.sign({ id: registeredUser._id }, config.secret, {
            expiresIn: 86400
        })
        console.log(token)
    })
    res.redirect("/")
}



exports.postLogin=(req,res)=>{
    const { email, password } = req.body;
    let emailFound;
       
    User.findOne({
        email
    })

    .then(user => {
        if(!user){
            return res.send({ auth: false, token: null, msg: "Invalid credentials" })
        }
        emailFound= user;

        bcrypt.compare(req.body.password,user.password)

        .then(result=>{

            if(!result){
                return res.send({ auth: false, token: null, msg: "Invalid credentials" })
            }
    
            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400
            })
            localStorage.setItem("authToken", token)
            res.redirect("/profile")  // Changed to absolute path
        })

    })

}


exports.postProfile=(req,res)=>{
    var token = localStorage.getItem("authToken")
    if (!token) {
        res.redirect("/")
    }
    jwt.verify(token, config.secret, (err, verifiedToken) => {
        if (err) {
            res.redirect("/")
        }
        User.findById(verifiedToken.id, { password: 0 } )

        .then(user=>{
            if (!user) {
                res.redirect("/")
            }
            res.render("dashboard.ejs", { user })
        })

        .catch(err => {
            res.redirect("/") 
        })
    })
}




exports.logOut=(req,res)=>{
    localStorage.removeItem("authToken")
    res.redirect("/")
}

