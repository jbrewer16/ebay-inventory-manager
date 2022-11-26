const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemnumber: { type: Number, required: true },
    itemname: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    shippingcost: { type: Number, required: true },
    fees: { type: Number, Number: true },
    imagelink: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;