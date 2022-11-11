const express = require('express');
const router = express.Router();

const { Spot } = require('../../db/models');


router.get('/', async (req, res) => {
    const spots = await Spot.scope('defaultScope').findAll();
    res.json(spots);
})

router.post('/', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    
    console.log('This is the id', req.user.id);
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage: '',
    });

    res.json(newSpot);
})

module.exports = router;