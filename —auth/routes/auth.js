const express    = require("express");
const router     = express.Router();
 const bcrypt    = require('bcrypt');
 const User      = require('../models/User');
 const Business  = require('../models/Business');

router.get('/signup', (req,res) => {            //when call the /signup
    res.render('signup');                       //render hbs 'signup'
});

router.get('/user/index', (req,res) => {            //when call the /signup
    res.render('/user/index');                       //render hbs 'signup'
});

// router.get('/login', (req,res) => {            //when call the /signup
//     res.render('login');                       //render hbs 'signup'
// });


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
                res.redirect('/user-index');
            })
            .catch(err => {
                next(err);
            })

        }
    })

});


router.post('/signup-business', (req,res,next) => {

    const { username, password } = req.body;

    if(password.length < 5) res.render( 'signup', {message : 'must be 2 chars min'})
    if(username === '')     res.render( 'signup', {message : 'cannot be empty'})

    //  CREATE A DB USER AND PASSWORD+SALT
    User.findOne({ username : username })
    .then( found =>{
        //  CHECK IF USER EXIST // IF EXISTS, SEND TO SIGNUP PAGE AND SEND MESSAGE
        if( found !== null) res.render('signup', { message :'The username is already exist' })
        
        else{
            //  ELSE CREATE THE PASSWORD+SALT
            const salt = bcrypt.genSaltSync();
            console.log(salt);
            const hash = bcrypt.hashSync(password, salt);
            //  CREATE THE USER AND PASSWORD IN DB
            Business.create({ companyName : companyName, password : hash })
            .then(dbUser => {
                //log in
                req.session.user = dbUser;
                res.redirect('/business-index');
            })
            .catch(err => {
                next(err);
            })
        }
    })
});

// router.post('/login', (req, res, next)=>{
//     //get user and pass
//     const { username , password} = req.body;
//     //check user and pass are correct
//     User.findOne({ username: username})     ///argumento pasado de body al metodo finOne
//     .then( found => {
//         //  IF THE USER DOESN'T EXIST
//         if(found === null) {    
//             res.render('login', { message : 'Invalid credentials' })
//         }
//         //check the passw match with database
//         if(bcrypt.compareSync( password, found.password )){
//             //IF PASSW + HASH MATCH //THE USER IS LOGGED
//             req.session.user = found;
//             res.redirect('/');
//         }
//         //  IF THE USER NAME MATCH BUT THE PASSW IS WRONG
//         else{
//             res.render('login', { message : 'Invalid credentials' })
//         }
//     });
// });


// router.get('/logout', (req, res, next) => {

//     req.session.destroy(err => {
//         if(err) next(err);
//         else res.redirect('/');
//     })
// });


module.exports = router;