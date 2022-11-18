const router = require('express').Router();
let Item = require('../models/item-model');

router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const itemnumber = req.body.itemnumber;
    const itemname = req.body.itemname;
    const category = req.body.category;
    const price = Number(req.body.price);
    const cost = Number(req.body.cost);
    const shippingcost = Number(req.body.shippingcost);
    const fees = Number(req.body.fees);
    const imagelink = req.body.imagelink;

    const newItem = new Item({
        itemnumber,
        itemname,
        category,
        price,
        cost,
        shippingcost,
        fees,
        imagelink,
    });

    newItem.save()
        .then(() => res.json('Item added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.itemnumber = req.body.itemnumber;
            item.itemname = req.body.itemname;
            item.category = req.body.category;
            item.price = Number(req.body.price);
            item.cost = Number(req.body.cost);
            item.shippingcost = Number(req.body.shippingcost);
            item.fees = Number(req.body.fees);
            item.imagelink = req.body.imagelink;

            item.save()
                .then(() => res.json('Item updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;