const express    = require("express");
const router     = express.Router();
const bcrypt     = require('bcrypt');
const Business   = require('../models/Business');
const { uploader, cloudinary } = require('../config/cloudinary');


router.get('/index', (req,res) => {
    console.log(req.session.user);
    res.render('business/index', {business: req.session.user});                      
});


router.get('/new', (req,res) => {            //when call the /signup
    console.log(req.session)
    res.render('business/new', {business: req.session.user});                       //render hbs 'signup'
});


router.post('/signup-business', (req,res,next) => {

    const { username, password } = req.body;


    if(password.length < 5) res.render( 'signup', {message : 'must be 5 chars min'})
    if(username === '')     res.render( 'signup', {message : 'cannot be empty'})


    //  CREATE A DB USER AND PASSWORD+SALT
    Business.findOne({ username : username })
    .then( found =>{
        //  CHECK IF USER EXIST // IF EXISTS, SEND TO SIGNUP PAGE AND SEND MESSAGE

        if( found !== null) res.render('signup', { message :'The username already exists' })
        
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

router.post('/new', uploader.single('avatar'), (req, res) => {
// router.post('/new', (req, res) => {
    console.log(req.body);
    console.log(req.session.user._id);
    const newBusiness = {
        companyName: req.body.companyName,
        username: req.body.username,
        description: req.body.description,
        contact: {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        website: req.body.website
        }, 
        avatar: req.body.avatar,
        products: req.body.products,
        voucher: req.body.voucher
      }
    Business.findByIdAndUpdate(req.session.user._id, newBusiness, {new: true})
    .then((updatedBusiness)=>{
        req.session.user = updatedBusiness
        res.redirect('/business/index')
    }).catch(err => console.log(err))
});



//ineke: add route to edit business info
router.get('/:id/edit', (req, res, next) => {
    Business.findById(req.params.id)
    .then(business => {
        res.render('business/edit', {business})
    })
    .catch(err => {
        next(err);
    });
});



router.get('/:id', (req, res) => {
    Business.findById(req.params.id)
    .then( business =>{
        res.render('business/company-details', {business: business } )
    }).catch(err => console.log(err));
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
            res.render('login', { businessmessage : 'Invalid credentials' })
        }
        //check the passw match with database
        if(bcrypt.compareSync( password, found.password )){
            
            //IF PASSW + HASH MATCH //THE USER IS LOGGED
            req.session.user = found;
            res.redirect('/business/index');
        }
            //IF THE USER NAME MATCH BUT THE PASSW IS WRONG
        else{
            res.render('login', { businessmessage : 'Invalid credentials' })
        }
    });
});


router.post('/new', uploader.single('avatar'), (req, res) => {
// router.post('/new', (req, res) => {
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
        imgName: req.file.path,
        imgPath: req.file.originalname,
        publicId: req.file.filename,
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

//ineke: add route to edit business info
router.get('/:id/edit', (req, res, next) => {
    Business.findById(req.params.id)
    .then(business => {
        res.render('business/edit', {business})
    })
    .catch(err => {
        next(err);
    });
});

router.get('/:id', (req, res) => {
    Business.findById(req.params.id)
    .then( (business) =>{
        console.log(business.products)

        res.render('business/company-details', {business: business } )
    }).catch(err => console.log(err));
})



module.exports = router;