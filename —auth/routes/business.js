const express    = require("express");
const router     = express.Router();
const bcrypt    = require('bcrypt');
const Business  = require('../models/Business');
const { uploader, cloudinary } = require('../config/cloudinary');

router.get('/new', (req,res) => {            //when call the /signup
    console.log(req.session)
    res.render('business/new', {business: req.session.user});                       //render hbs 'signup'
});

router.get('/index', (req,res) => {            
    res.render('business/index', {business: req.session.user});                      
});
router.get('/index', (req,res, next) => { 
    Business.find()
    then(businesses =>{
    res.render('business/index', { businesses });  

    })  
    .catch(err => {
        next(err);
    })         
});

router.post('/signup-business', (req,res,next) => {

    const { username, password } = req.body;

    if(password.length < 5) res.render( 'signup', {message : 'must be 2 chars min'})
    if(username === '')     res.render( 'signup', {message : 'cannot be empty'})

    //  CREATE A DB USER AND PASSWORD+SALT
    Business.findOne({ username : username })
    .then( found =>{
        //  CHECK IF USER EXIST // IF EXISTS, SEND TO SIGNUP PAGE AND SEND MESSAGE
        if( found !== null) res.render('signup', { message :'The username is already exist' })
        
        else{
            //  ELSE CREATE THE PASSWORD+SALT
            const salt = bcrypt.genSaltSync();
            console.log(salt);
            const hash = bcrypt.hashSync(password, salt);
            //  CREATE THE USER AND PASSWORD IN DB
            Business.create({ username : username, password : hash })
            .then(dbBusiness => {
                //log in
                req.session.user = dbBusiness;
                res.redirect('/business/new');
            })
            .catch(err => {
                next(err);
            })
        }
    })
});

router.post('/new', uploader.single('avatar'), (req, res) => {
    console.log(req.body);
    console.log(req.session.user._id);
    const newBusiness = {
        username: req.body.username,
        description: req.body.description,
        contact: {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        website: req.body.website
        }, 
        avatar: {
        imgName: req.body.imgName,
        imgPath: req.body.imgPath,
        publicId: req.body.publicId,
        },
        products: req.body.products,
        voucher: req.body.voucher
      }
    Business.findByIdAndUpdate(req.session.user._id, newBusiness, {new: true})
    .then((updatedBusiness)=>{
        req.session.user = updatedBusiness
        res.redirect('/business/index')
    }).catch(err => console.log(err))
});

router.get('/index', (req, res) => {
    console.log(req.session.user)
    res.render('business/index', {business: req.session.user._id } )
})



router.post('/login-business', (req, res, next)=>{
    //get user and pass
    console.log('checking');
    const { username , password} = req.body;
    //check user and pass are correct
    Business.findOne({ username: username})     ///argumento pasado de body al metodo finOne
    .then( found => {
        //  IF THE USER DOESN'T EXIST
        if(found === null) {    
            res.render('login', { message : 'Invalid credentials' })
        }
        //check the passw match with database
        if(bcrypt.compareSync( password, found.password )){
            
            //IF PASSW + HASH MATCH //THE USER IS LOGGED
            req.session.user = found;
            res.redirect('/business/index');
        }
            //IF THE USER NAME MATCH BUT THE PASSW IS WRONG
        else{
            res.render('login', { message : 'Invalid credentials' })
        }
    });
});

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/');
      }
    });
  });




module.exports = router;