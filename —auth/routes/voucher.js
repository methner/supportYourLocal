const express    = require("express");
const router     = express.Router();
const mongoose   = require('mongoose');
const Business = require("../models/Business");
const Voucher    = require("../models/Voucher");


router.get('/add-voucher', (req,res) => {     
    // Voucher.find().then(allVouchers => {
    //     const ownedVouchers = allVouchers.filter(voucher => {
    //         return voucher.owner == req.session.user._id
    //     })

    //    , ownedVouchers
   res.render('business/add-voucher', );


});



router.post(':id/add-voucher', (req, res, next) => {

    const { title, description, price } = req.body;

    Voucher.create({ title: title, description:description, price:price })
        .then(dbVoucher => {
            
        // Business.findById(req.params.id).populate('voucher', { voucher : dbVoucher})
        //     res.redirect('/voucher/voucher-details', {dbVoucher});
        })
        .catch(err => {
            console.log(err)
        });
});

module.exports = router;


