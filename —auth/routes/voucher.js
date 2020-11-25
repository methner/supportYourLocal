const express    = require("express");
const Voucher = require("../models/Voucher");
const router     = express.Router();




router.get('/voucher', (req,res) => {              
   console.log("this is the voucher route");
   res.render('business/voucher-details');                
});


router.post('/', (req, res, next) => {
    const { title, description, price } = req.body;
    Voucher.create({ title, description, price })
        .then(() => {
            res.redirect('voucher-details');
        })
        .catch(err => {
            console.log(err)
        });
});


module.exports = router;


