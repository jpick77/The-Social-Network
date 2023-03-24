const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../controllers/thought-controller.js');


router.route('/').get(getAllThoughts);


router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);


router.route('/:userId').post(createThought);


router.route('/:id/reactions').post(createReaction);


router.route('/:id/reactions/:reactionId').delete(deleteReaction);


module.exports = router;