const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    username: { type: String, required: true },
    itemnumber: { type: Number, required: true },
    amount: { type: Number, required: true },
    finalprofit: { type: Number, required: true },
    listinglink: { type: String, required: true },
    dateadded: { type: Date, required: true },
    datesold: { type: Date, required: true },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;