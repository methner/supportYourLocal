const express    = require("express");
const Voucher = require("../models/Voucher");
const router     = express.Router();
const Business  = require('../models/Voucher');




router.get('/', (req,res) => {              
   console.log("this is the voucher route");
   // res.render('business/voucher-details', {voucher});                
});


router.post('/', (req, res, next) => {
    const { title, description, price } = req.body;
    Voucher.create({ title, description, price })
        .then(() => {
            res.redirect('voucher-details');
        });
        .catch(err => {
            next(err);
        });
});


module.exports = router;


