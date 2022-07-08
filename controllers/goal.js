const db = require('../models')
const Goal = db.goals;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['Goals']
    Goal
    .find()
    .then((data) => {
        if(!data) res.status(404).send({message:'Nothing to Display'});
        else {
            res.send(data);
            console.log(data);
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: 'Error retrieving Goal',
            error: err
        });
    });
};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['Goals']
    try {
        const goalId = new ObjectId(req.params.id);
        Goal.find({ _id: goalId })
        .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || 'Some error occurred while retrieving your goal.'
            });
          });
    } catch (err) {
        res.status(500).json(err);
    } 

};

const addOne = async (req,res,next) => {
    // #swagger.tags = ['Goals']
    const goal = new Goal(req.body);
    goal.save()
    .then((data) => {
        console.log(data);
        res.status(201).send(data);
    })
    .catch((err) =>{
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the goal.'});
    });

        };

const editOne = async (req,res,next) => {
    // #swagger.tags = ['Goals']
    const goalId = new ObjectId(req.params.id)
    const goal = req.body;
    Goal
        .replaceOne({ _id: goalId }, goal)
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error occured while trying to update goal.'
            });
        });
};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Goals']
    Goal
        .deleteOne()
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error occured while trying to delete goal.'
            });
        });
};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }