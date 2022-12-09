const router = require('express').Router();
let Order = require('../models/order-model');

router.route('/').get((req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const listing = req.body.listing;
    const amountOrdered = req.body.amountOrdered;
    const status = req.body.status;
    const datesold = Date.parse(req.body.datesold);

    const newOrder = new Order({
        listing,
        amountOrdered: amountOrdered,
        status,
        datesold,
    });

    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Order.findById(req.params.id)
        .then(order => res.json(order))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json('Order deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Order.findById(req.params.id)
        .then(order => {
            order.listing = req.body.listing;
            order.amountOrdered = Number(req.body.amountOrdered);
            order.status = req.body.status;
            order.datesold = Date.parse(req.body.datesold);

            order.save()
                .then(() => res.json('Order updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;