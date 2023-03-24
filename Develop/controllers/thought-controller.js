const { User, Thought } = require('../models');

module.exports = {
    
    getAllThoughts(req, res) {
        Thought.find()
        .then((users) => res.json(users))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
              }) 
    },
    
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .select('-__V')
        .then((thought) => (
            !thought
                ? res.status(404).json({ message: 'There is no thought with that ID' })
                : res.json(thought)
            ))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    
    createThought(req, res) {
        Thought.create(req.body)
            .then(({_id}) => {
             return User.findOneAndUpdate({ _id: req.params.id}, {$push: {thought: _id}}, {new: true});
            })
            .then((thought) => {
                res.json({ message: 'Thought created!' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id},
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => (
                !thought
                    ? res.status(404).json({ message: 'There is no user with this id!' })
                    : res.json(thought)
            ))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    
    deleteThought(req, res) {
        Thought.findOneAndDelete( { _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'There is no Thought with that ID' })
                    : res.json({ message: 'Thought deleted!' })
                )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                      }) 
    },
    
    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id})
        .then((data) => {
            !data
            ? res.status(404).json({ message: 'Thought not found.' })
            : res.json({ message: 'Reaction created!' });
           })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
                  }) 
    },
    
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new : true})
        .then(thought => {
            res.json('Reaction deleted!');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
                  }) 
    } 
}