const express    = require("express");
const router     = express.Router();
const mongoose   = require('mongoose');
const Business = require("../models/Business");
const Voucher    = require("../models/Voucher");


router.get('/add-voucher', (req,res) => {     
    console.log(req.session);
    Business.findById(req.session.user._id).then(loggedUser => {
        console.log(loggedUser)
        res.render('business/add-voucher', {loggedUser});

    })
});

router.get("/voucher-details", (req, res) => {

})

router.post('/add-voucher/:id', (req, res, next) => {
    const loggedUser = req.params.id;
    const { title, description, price } = req.body;

    Voucher.create({ title: title, description:description, price:price, owner: loggedUser })

        .then(dbVoucher => {
            console.log(dbVoucher)
        // Business.findById(req.params.id).populate('voucher', { voucher : dbVoucher})
             res.redirect('/voucher/voucher-details');
        })
        .catch(err => {
            console.log(err)
        });
});

module.exports = router;

