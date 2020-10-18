const express = require('express');
const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto = require('crypto');


const userRegistration = new Schema({
    firstname : String,
    lastname : String,
    email:{
        unique:true,
        type:String
    },
    password : String
});


// userRegistration.pre('save' , function(next){
//     // var user = this;
//     // if(!user.isModified('password')) return next();
//     // bcrypt.genSalt(10, function(err, salt){
//     //     if(err) return next(err);
//     //     bcrypt.hash(user.password, salt,null, function(err, hash){
//     //         if(err) return next(err);
//     //         user.password=hash;
//     //         next();
//     //      })
//     // })


    
// });


userRegistration.pre('save', function(next)  {
    bcrypt.hash(this.password, 10, function(error, hash) {
      if (error) {
        return next(error);
      } else {
        this.password = hash;
        this.confirmPassword = hash;
        next();
      }
    });
  });
  
//   userRegistration.pre('validate', function(next) {
//     let user = this;
//     if (user.password !== user.confirmPassword) {
//       return next('Passwords must match');
//     } else {
//       next();
//     }
//   });

userRegistration.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
// userRegistration.methods.gravatar = function(size){
//     if(!this.size ) size = 200;
//     if(!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
//     var md5 = crypto.createHash('md5').update(this.email).digest('hex');
//     return 'https://gravatar.com/avatar/' + md5 + '?=s' + size + '&d=retro';
// }





//hashing the pasword
// userRegistration.pre('save' , function(next){
//     var user = this;
//     if(!user.isModified('password')) return next();
//     bcrypt.genSalt(10, function(err, salt){
//         if(err) return next(err);
//         bcrypt.hash(user.password, salt,null, function(err, hash){
//             if(err) return next(err);
//             user.password=hash;
//             console.log(user.password);
//             next();
//          })
//     })
// });


//compare the password
// userRegistration.methods.comparePassword = function(password){
//     return bcrypt.compareSync(password, this.password);
// }

// userRegistration.methods.gravatar = function(size){
//     if(!this.size ) size = 200;User
//     if(!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
//     var md5 = crypto.createHash('md5').update(this.email).digest('hex');
//     return 'https://gravatar.com/avatar/' + md5 + '?=s' + size + '&d=retro';
// }

module.exports = mongoose.model('register', userRegistration)
