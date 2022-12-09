const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    listing: { type: Object, required: true },
    amountOrdered: { type: Number, required: true },
    status: { type: String, required: true },
    datesold: { type: Date, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;