const express = require('express')
const ejs = require('ejs');
// const secret = require('./config/secret');
const mongoose = require('mongoose')
const app = express();
const port = 9000;
const db = mongoose.connection;
const secret = require('./config/secret');
const bodyParser = require("body-parser");
const flash = require('express-flash');
const session = require('express-session')
const passport = require('passport')

// mongoose.connect( 'mongodb+srv://cohort:Kollybright@cluster0.zhjy3.mongodb.net/greengarage?retryWrites=true&w=majority',
//  {useNewUrlParser: true});
  

mongoose.connect(secret.databaseURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}); 


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are already connected to the server database")
});



//helps us to activate or gives permission to the server to know the user 
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash()); 

  
// set the view engine for ejs
app.set('view engine', 'ejs');

//configure your middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }))

//allow us to use the public files 
app.use('/', express.static('public'));


const pageRoutes = require('./controllers/pageRoutes');
app.use('/', pageRoutes);

const postRoutes = require('./controllers/postRoutes');
app.use('/', postRoutes);

const userRoutes = require('./controllers/userRoutes');
app.use('/', userRoutes);







app.listen(port, function(){
    console.log("we are connected to port "  + port )
})