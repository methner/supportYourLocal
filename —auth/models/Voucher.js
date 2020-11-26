const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
  title: String,
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  },
  price: Number,
  

});

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;