const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    item: { type: Object, required: true },
    originalAmount: { type: Number, required: true },
    amountLeft: { type: Number, required: true },
    listinglink: { type: String, required: true },
    status: { type: String, required: true },
    dateadded: { type: Date, required: true }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;