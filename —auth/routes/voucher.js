const express    = require("express");
const Voucher = require("../models/Voucher");
const router     = express.Router();




router.get('/', (req,res) => {              
   console.log("this is the voucher route");
   res.render('business/voucher-details');                
});


router.post('/voucher', (req, res, next) => {
    const { title, description, price } = req.body;
    Voucher.create({ title, description, price })
        .then(() => {
            res.redirect('/voucher-details');
        })
        .catch(err => {
            console.log(err)
        });
});

router.get("/voucher-details", (req,res) =>  {
    Voucher.findOne({voucher})
    res.render("business/voucher-details", {voucher})
})

module.exports = router;


