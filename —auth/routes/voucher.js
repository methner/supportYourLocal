const express    = require("express");
const router     = express.Router();
const Business  = require('../models/Voucher');


router.get('/voucher-details', (req,res) => {            
    res.render('business/voucher-details', {voucher});                  
});