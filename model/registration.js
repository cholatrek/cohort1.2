const express = require('express');
const mongoose =  require('mongoose');
const Schema  = mongoose.Schema;

const registration = new Schema ({

    fullname : String,
    email : String,
    password : String,
    address: String,
    date: Date,
    
});


module.exports = mongoose.model('registration', registration  );