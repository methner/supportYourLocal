const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const businessSchema = new Schema({
    companyName: String,
    description: String,
    contact: {
        name: String,
        phone: String,
        address: String,
        email: String,
        website: String,
    },
    username: String,
    password: String,
    //   socialmedia: String,
    avatar: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
      },
    
    voucher: [
        { type: Schema.Types.ObjectId, ref: 'Voucher' }],

    products: [
        {name: String, imageUrl: String,}
    ],
    voucher1: String,


});

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;