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
  imgName: String,
  imgPath: String,
  publicId: String,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}

});

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;