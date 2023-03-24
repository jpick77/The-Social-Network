const { User, Thought } = require('../models');

module.exports = {
    
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .select('-__V')
            .then((user) => (
                !user
                    ? res.status(404).json({ message: 'There is no user with that ID' })
                    : res.json(user)
                ))
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                      }) 
    },
    
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => (
                !user
                    ? res.status(404).json({ message: 'There is no user with this id!' })
                    : res.json(user)
            ))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
     
    deleteUser(req, res) {
        User.findOneAndDelete( { _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'There is no user with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
                )
                .then(() => res.json({ message: 'User and their thoughts deleted!' }))
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                      }) 
    },
    
    addFriend(req, res) {
        User.findOneAndUpdate( { _id: req.params.id},
          //  { friends: { $ne: req.params.friendId }},
            { $push : { friends: req.params.friendId }},
            { new: true, unique: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'There is no user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    
    deleteFriend(req, res) {
        User.findOneAndUpdate( { _id: req.params.id},
            { $pull : { friends: req.params.friendId }},
            { new: true, unique: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'There is no user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    }
};