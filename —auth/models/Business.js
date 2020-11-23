const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const businessSchema = new Schema({
    name: String,
    description: String,
    contact: {
        phone: Number,
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
        { type: Schema.Types.ObjectId, ref: Voucher }],
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;