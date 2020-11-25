const express    = require("express");
const router     = express.Router();
const bcrypt    = require('bcrypt');
const Business  = require('../models/Business');

router.get('/new', (req,res) => {            //when call the /signup
    console.log(req.session)
    res.render('business/new', {business: req.session.user});                       //render hbs 'signup'
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

router.post('/new', (req, res) => {
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
        }
      }
    Business.findByIdAndUpdate(req.session.user._id, newBusiness, {new: true})
    .then((updatedBusiness)=>{
        req.session.user = updatedBusiness
        res.redirect('/business/index')
    }).catch(err => console.log(err))
});

router.get('/index', (req, res) => {
    console.log(req.session.user)
    res.render('business/index', {business: req.session.user } )
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




module.exports = router;