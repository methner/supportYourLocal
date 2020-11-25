const express    = require("express");
const router     = express.Router();
const Business  = require('../models/Voucher');




router.get('/', (req,res) => {            
   // res.render('business/voucher-details', {voucher});   
   console.log("this is the voucher route")               
});


module.exports = router;