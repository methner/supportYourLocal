const express    = require("express");
const router     = express.Router();
 const bcrypt    = require('bcrypt');
 const User      = require('../models/User');

router.get('/signup', (req,res) => {            //when call the /signup
    res.render('signup');                       //render hbs 'signup'
});

router.post('/signup-user', (req,res,next) => {

    const { username, password } = req.body;

    //  USER FORMAT CONDITIONS
    if(password.length < 5) res.render( 'signup', {message : 'must be 2 chars min'})
    if(username === '')     res.render( 'signup', {message : 'cannot be empty'})

    //  CREATE A DB USER AND PASSWORD+SALT
    User.findOne({ username : username })
    .then( found =>{

        //  CHECK IF USER EXIST // IF EXISTS, SEND TO SIGNUP PAGE AND SEND MESSAGE
        if( found !== null) res.render('signup', { message :'The username is already exist' })
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


module.exports = router;