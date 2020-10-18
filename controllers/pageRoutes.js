const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.render('index', {
        title: 'Home Page'
    })
}  );


//let us build abnout us page route
router.get('/about', function(req,res){
    res.render('about', {
        title : 'About Us'
    })
}  );

//blog page route
router.get('/blog', function(req,res){
    res.render('blog', {
        title: 'Blog 0n'
    })
});

router.get('/login', function(req,res){
    res.render('login', {
        title : 'login Page',
        error : req.flash('error')
    } )
})

router.get('/signup', function(req,res){
    res.render('signup',{
        title:'signup here',
        message : req.flash('message')
    })
})

module.exports = router;