const express    = require("express");
const router     = express.Router();
 const bcrypt    = require('bcrypt');
 const mongoose  = require('mongoose');
 const User      = require('../models/User');
const Business   = require('../models/Business');

router.get('/index', (req,res) => {            //when call the /signup
    res.render('user/index', {user: req.session.user});                       //render hbs 'signup'
});


router.post('/signup-user', (req,res,next) => {

    const { username, password } = req.body;

    //  USER FORMAT CONDITIONS
    if(password.length < 2) res.render( 'signup', {usermessage : 'must be 2 chars min'})
    if(username === '')     res.render( 'signup', {usermessage : 'cannot be empty'})

    //  CREATE A DB USER AND PASSWORD+SALT
    User.findOne({ username : username })
    .then( found =>{
        //  CHECK IF USER EXIST // IF EXISTS, SEND TO SIGNUP PAGE AND SEND MESSAGE
        if( found !== null) res.render('signup', { usermessage :'The username is already exist' })
        //  ELSE CREATE THE PASSWORD+SALT
        else{            
            const salt = bcrypt.genSaltSync();
            console.log(salt);
            const hash = bcrypt.hashSync(password, salt);
            //  CREATE THE USER AND PASSWORD IN DB
            User.create({ username : username, password : hash })                
            .then(dbUser => {
                //log in
                req.session.user = dbUser;
                res.redirect('/user/index');
            })
            .catch(err => {
                next(err);
            })
        }
    })
});


router.post('/login-user', (req, res, next)=>{
    //get user and pass
    const { username , password} = req.body;
    //check user and pass are correct
    User.findOne({ username: username})     ///argumento pasado de body al metodo finOne
    .then( found => {
        //  IF THE USER DOESN'T EXIST
        if(found === null) {    

            res.render('login', { usermessage : 'Invalid credentials' })
        }
        //check the passw match with database
        if(bcrypt.compareSync( password, found.password )){
            
            //IF PASSW + HASH MATCH //THE USER IS LOGGED
            req.session.user = found;
            res.redirect('/user/index');
        }
            //IF THE USER NAME MATCH BUT THE PASS IS WRONG
        else{

            res.render('login', { usermessage : 'Invalid credentials' })

        }
    });
});


router.get('/company-overview', (req, res) => {
    //EMPTY FIND() TO GET ALL THE BUSINESS FROM DB
      Business.find()
      .then(business => { //     //RENDER THE COMPANIES VIEW TO DISPLAY THEM
        res.render('user/company-overview', {companyList : business});
      }).catch(err => {
          console.log(err);
      })
});

module.exports = router;