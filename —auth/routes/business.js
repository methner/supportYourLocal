const express    = require("express");
const router     = express.Router();
const bcrypt    = require('bcrypt');
const Business  = require('../models/Business');

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
                res.redirect('/business/index');
            })
            .catch(err => {
                next(err);
            })
        }
    })
});


module.exports = router;