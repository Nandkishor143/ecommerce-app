const mongoose = require('mongoose');
const { stringify } = require('querystring');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                defualt: 1,
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
},
    { timestamps: true }
    );


module.exports = mongoose.model("Order", orderSchema)