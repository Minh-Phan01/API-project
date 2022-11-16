const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

router.delete('/:reviewImageId', requireAuth, async (req, res, next) => {
    const reviewImageId = req.params.reviewImageId;
    const usersId = req.user.id;

    const doomedImage = await ReviewImage.findByPk(reviewImageId, {
        include: [
            { model: Review, attributes: ['id', 'userId']}
        ]
    });

    if (!doomedImage) {
        const err = new Error('Review Image could not be found');
        err.status = 404;
        return next(err);
    }

    if (doomedImage.Review.userId === usersId) {
        await doomedImage.destroy();
        return res.status(200).json({
            'message': 'Successfully deleted'
        });
    }
});



module.exports = router;