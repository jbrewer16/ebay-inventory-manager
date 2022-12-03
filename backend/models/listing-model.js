const mongoose = require('mongoose');
const Item = require('./item-model');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    item: { type: Object, required: true },
    amount: { type: Number, required: true },
    finalprofit: { type: Number, required: true },
    listinglink: { type: String, required: true },
    status: { type: String, required: true },
    dateadded: { type: Date, required: true },
    datesold: { type: Date, required: true },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;