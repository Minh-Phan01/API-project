const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
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

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const { startDate, endDate } = req.body;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const currentDate = new Date();

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        const err = new Error('Booking could not be found');
        err.status = 404;
        return next(err);
    };

    if (endDateObj < startDateObj) {
        const err = new Error('endDate cannot be on or before startDate');
        err.status = 400;
        return next(err);
    };

    if (endDateObj < currentDate) {
        const err = new Error('Past bookings cannot be modified');
        err.status = 403;
        return next(err);
    };

    const bookingsDate = await Booking.findOne({
        where: {
            spotId: booking.spotId,
            [Op.or]: [
                { startDate: {[Op.between]: [startDateObj, endDateObj] }},
                { endDate: {[Op.between]: [startDateObj, endDateObj]}}
              ]
        }
    })

    if (bookingsDate) {
        const err = new Error('Sorry, this spot is already booked for the specified dates');
        err.status = 403;
        err.errors = {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
          }
        return next(err);
    }

    booking.update({
        startDate,
        endDate
    });

    res.json(booking);
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const usersId = req.user.id;
    const currentDate = new Date();
    const doomedBooking = await Booking.findByPk(bookingId,{
        include: [
            { model: Spot, attributes: ['ownerId']}
        ]
    });

    if (!doomedBooking) {
        const err = new Error('Booking could not be found');
        err.status = 404;
        return next(err);
    };

    const startDateObj = new Date(doomedBooking.startDate);
    const endDateObj = new Date(doomedBooking.endDate);

    if (currentDate > startDateObj && currentDate < endDateObj) {
        const err = new Error('Bookings that have been started cannot be deleted');
        err.status = 403;
        return next(err);
    };

    if (doomedBooking.userId === usersId || doomedBooking.Spot.ownerId === usersId ) {
        await doomedBooking.destroy();
        return res.status(200).json({
            'message': 'Successfully deleted'
        });
    }
});

module.exports = router;