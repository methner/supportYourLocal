const express    = require("express");
const Voucher = require("../models/Voucher");
const router     = express.Router();


router.get('/', (req,res) => {     
    // Voucher.find().then(allVouchers => {
        // const ownedVouchers = allVouchers.filter(voucher => {
        //     return voucher.owner == req.session.user._id
        // })

   res.render('business/voucher-details'
//    , ownedVouchers
   );                
});


router.post('/voucher', (req, res, next) => {
    const { title, description, price } = req.body;
    Voucher.create({ title, description, price })
        .then(() => {
            res.redirect('/voucher/details');
        })
        .catch(err => {
            console.log(err)
        });
});

router.get("/details", (req,res) =>  { 

        res.render("business/voucher-details")

    

})

//try findMany method

module.exports = router;


