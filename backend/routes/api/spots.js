const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize')
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');


router.get('/', async (req, res) => {
    const spots = await Spot.scope('defaultScope').findAll();
    res.json(spots);
})

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    
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
});

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const userId = req.user.id;

    if (!spot) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        res.json({
            message: err.message,
            statusCode: err.status
        });
    };

    if (userId !== spot.ownerId) {

    }

    const newImage = await SpotImage.create({
        spotId,
        url: req.body.url,
        preview: req.body.previewImage
    });

    return res.json({newImage});

})

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const spots = await Spot.findAll({
        where: {
            ownerId: userId
        }
    });
    res.json(spots);
});

router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId, {
        attributes: {
           include: [
            [Sequelize.fn('COUNT', Sequelize.col('Reviews.stars')), 'numReviews'],
            [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']
           ]
        },
        include: [
            {model: SpotImage, attributes: ['id', 'url', 'preview']},
            {model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']},
            {model: Review, attributes: {
                include: []
            }}
        ],
    });

    if (!spot.id) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        return res.json({
            message: err.message,
            statusCode: err.status
        });
    };

    res.json(spot);
})

router.put('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        return next(err)
        }
    

    spot.update({ 
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.json(spot);
})

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        return next(err)
        };

    const duplicateReview = await Review.findOne({
        where: {
            userId,
            spotId
        }
    });

    if (duplicateReview) {
        const err = new Error('User alread has a review for this spot');
        err.status = 403;
        return next(err);
    }

    const newReview = await Review.create({
        userId,
        spotId,
        review: req.body.review,
        stars: req.body.stars
    });

    res.json(newReview);
});

router.get('/:spotId/reviews', async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const reviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: ReviewImage}
        ]
    });

    if (!spot) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        return next(err)
        };


    res.json(reviews)
});


//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', async (req, res, next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId);

    const { startDate, endDate } = req.body;

    if (endDate < startDate) {
        const err = new Error('endDate cannot be on or before startDate');
        err.status = 400;
        return next(err);
    }

    const bookingConflict = await Booking.findOne({
        where: {
            spotId,
            startDate,
            endDate
        }
    });
        
     if (bookingConflict) {
        const err = new Error('Sorry, this spot is already booked for the specified dates');
        err.status = 403;
        return next(err);
     };   

    if (!spot) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        return next(err)
        };

    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    })

    res.json(newBooking);
});


//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const usersId = req.user.id;
   
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        return next(err)
        };

    if (spot.ownerId === usersId) {
        const OwnerBookings = await Booking.findAll({
            where: {
                spotId
            }, 
            include: [
                {model: User, attributes: ['id', 'firstName', 'lastName']}
            ]
        })
       return res.json(OwnerBookings);
    } else {
        const bookings = await Booking.findAll({
            where: {
                spotId
            }
        });
        return res.json(bookings);
    }

    
})

module.exports = router;