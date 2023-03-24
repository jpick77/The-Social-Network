const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../controllers/user-controller.js');


router.route('/').get(getAllUsers).post(createUser);


router.route('/:id').get(getSingleUser).delete(deleteUser).put(updateUser);


router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;