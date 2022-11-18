const router = require('express').Router();
let Listing = require('../models/listing-model');

router.route('/').get((req, res) => {
    Listing.find()
        .then(listings => res.json(listings))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const itemnumber = Number(req.body.itemnumber);
    const amount = Number(req.body.amount);
    const finalprofit = Number(req.body.finalprofit);
    const listinglink = req.body.listinglink;
    const dateadded = Date.parse(req.body.dateadded);
    const datesold = Date.parse(req.body.datesold);

    const newListing = new Listing({
        username,
        itemnumber,
        amount,
        finalprofit,
        listinglink,
        dateadded,
        datesold,
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
            listing.username = req.body.username;
            listing.itemnumber = Number(req.body.itemnumber);
            listing.amount = Number(req.body.amount);
            listing.finalprofit = Number(req.body.finalprofit);
            listing.listinglink = req.body.listinglink;
            listing.dateadded = Date.parse(req.body.dateadded);
            listing.datesold = Date.parse(req.body.datesold);

            listing.save()
                .then(() => res.json('Listing updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;