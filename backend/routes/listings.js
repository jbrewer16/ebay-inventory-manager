const router = require('express').Router();
let Listing = require('../models/listing-model');

router.route('/').get((req, res) => {
    Listing.find()
        .then(listings => res.json(listings))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const item = req.body.item;
    const originalAmount = Number(req.body.originalAmount);
    const amountLeft = Number(req.body.amountLeft);
    const listinglink = req.body.listinglink;
    const status = req.body.status;
    const dateadded = Date.parse(req.body.dateadded);

    const newListing = new Listing({
        item,
        originalAmount,
        amountLeft,
        listinglink,
        status,
        dateadded,
    });

    newListing.save()
        .then(() => res.json('Listing added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Listing.findById(req.params.id)
        .then(listing => res.json(listing))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Listing.findByIdAndDelete(req.params.id)
        .then(() => res.json('Listing deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Listing.findById(req.params.id)
        .then(listing => {
            listing.item = req.body.item;
            listing.originalAmount = Number(req.body.originalAmount);
            listing.amountLeft = Number(req.body.amountLeft);
            listing.listinglink = req.body.listinglink;
            listing.status = req.body.status;
            listing.dateadded = Date.parse(req.body.dateadded);

            listing.save()
                .then(() => res.json('Listing updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;