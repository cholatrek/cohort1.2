const express = require('express');
const router = express.Router();
const Registration = require('../model/registration')


router.post('/registration', function(req,res){
    const registration = new Registration({
        fullname : req.body.fullname,
        email : req.body.email,
        password : req.body.password,
        address : req.body.address,
        date : req.body.date
    }).save(function (err, registration){
        if(err){
            console.log("error" + err)
        }else{
            res.redirect('/');
        }
    })
} )





module.exports = router;