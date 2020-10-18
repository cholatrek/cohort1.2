const express = require('express');
const router = express.Router();
const User  = require('../model/userReg');
const passport = require('passport')
var localPassport = require('../config/passport')



//this helps us to recognize the user
passport.serializeUser(function(user, done){
    done(null, user._id);
});
  
  
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        done(err,user);
    })
  });


  
//this is the registration post route
router.post('/signup', function(req,res,next){


    var user = new User();

    user.email = req.body.email;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname
    user.password = req.body.password;
    
    console.log ( "user.email = " +  user)
    
    User.findOne({email:req.body.email}, (err,existinguser)=>{
        if(existinguser){
            req.flash('message', 'Account with this email already exists');
            res.redirect('/signup') 
        }else{
            user.save(function(err,user){
                if(err) return next(err);
                req.flash('message', 'Successful login!!'); 
                    req.login(user,function(err){
                        if(err) return next(err);
                        res.redirect('/');
                    })
            }) 
           
        } 
    });
    
});


router.post('/login' , passport.authenticate('local-login', {

    successRedirect:'/',
    failureRedirect : '/login',
    failureFlash:true
    
}) )

module.exports = router;
