const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize')
const { Spot, User, ReviewImage, Review, Booking} = require('../../db/models');

router.get('/current', requireAuth, async(req, res, next) =>{
    const userId = req.user.id;
    const Bookings = await Booking.findAll({
        where: {
            userId
        },
       include: [
        {model: Spot}
       ],
    });

    res.json({Bookings})
});

module.exports = router;