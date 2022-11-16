const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

router.delete('/:spotImageId', requireAuth, async(req, res, next) => {
    const spotImageId = req.params.spotImageId;
    const usersId = req.user.id;

    const doomedImage = await SpotImage.findByPk(spotImageId, {
        include: [
            { model: Spot, attributes: ['ownerId']}
        ]
    });

    if (!doomedImage) {
        const err = new Error('Review Image could not be found');
        err.status = 404;
        return next(err);
    };

    if (doomedImage.Spot.ownerId === usersId) {
        await doomedImage.destroy();
        return res.status(200).json({
            'message': 'Successfully deleted'
        });
    }
});

module.exports = router;