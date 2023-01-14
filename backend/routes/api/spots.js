const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { check, query } = require('express-validator');
const { Op } = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

const validateSpot = [
   check('address')//
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),

   check('city')//
    .exists({ checkFalsy: true })
    .withMessage('City is required'),

   check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),

   check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),

   check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is not valid').bail()
    .isNumeric({ checkFalsy: true })
    .withMessage('Latitude is not valid'),

   check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is not valid').bail()
    .isNumeric({ checkFalsy: true })
    .withMessage('Longitude is not valid'),

   check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name must be less than 50 characters").bail()
    .isLength({ max: 51 })
    .withMessage("Name must be less than 50 characters"),

   check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),

   check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required").bail()
    .isInt({ checkFalsy: true })
    .withMessage("Price per day is required"),

  handleValidationErrors,
];

const validateReview = [
    check("review")
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check("stars")
      .exists({ checkFalsy: true })
      .withMessage("Stars must be an integer from 1 to 5").bail()
      .isInt({ min: 1, max: 5 })
      .withMessage("Stars must be an integer from 1 to 5"),
  
    handleValidationErrors,
  ];

router.get('/', async (req, res) => {
    let { page, size } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    if (!page) page = 1;
    if (!size) size = 10;
    let limit;
    let offset;

    if (page === 0) {
        page = null;
        size = null;
    } else if (page > 10) {
        page = 10;
    } else if (size > 20) {
        size = 20
    } else {
        limit = size;
        offset = size * (page - 1)
    }

    const spots = await Spot.scope('defaultScope').findAll();
    res.json({
        spots,
        page: page,
        size: size
    });
})

router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = req.body;
    
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
        previewImage,
    });

    res.json(newSpot);
});

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const userId = req.user.id;


//fix error handler below!!!    
    if (!spot) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        return next(err);
    };
//-----------------------------

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

router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId, {
        attributes: {
           include: [
            [Sequelize.fn('COUNT', Sequelize.col('Reviews.stars')), 'numReviews'],
            [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']
           ]
        },
        group: ['Reviews.review', 'Reviews.stars', 'Reviews.id', 'Spot.id', 'Owner.id', 'SpotImages.id'],
        include: [
            {model: SpotImage, attributes: ['id', 'url', 'preview']},
            {model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']},
            {model: Review, attributes: {
                include: []
            }}
        ],
    });
 //fix error handler below!!!   -----------------
    if (!spot) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        return next(err);
    };
//--------------------------------
    res.json(spot);
})

router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
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

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
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
            [Op.and]:[{userId},{spotId}],
            
        }
    });
    
    if (duplicateReview) {
        const err = new Error('User already has a review for this spot');
        err.errors = ['User already has a review for this spot']
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
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (endDate < startDate) {
        const err = new Error('endDate cannot be on or before startDate');
        err.status = 400;
        return next(err);
    }
  
    const bookingsDate = await Booking.findOne({
        where: {
            spotId,
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

    if (!spot) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        return next(err)
        };

    if (spot.ownerId !== userId)  {  
    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    });

    res.json(newBooking);
    } else {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }

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
});

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const usersId = req.user.id;

    const doomedSpot = await Spot.findByPk(spotId);

    if (!doomedSpot) {
        const err = new Error('Spot could not be found');
        err.status = 404;
        return next(err);
    };

    if (doomedSpot.ownerId === usersId) {
        await doomedSpot.destroy();
        return res.status(200).json({
            'message': 'Successfully deleted'
        });
    } else {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        });
    }
});

module.exports = router;