const db = require('../models')
const Goal = db.goals;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['Goals']
    try {
    Goal
    .find()
    .then((data) => {
        if(!data) res.status(404).send({message:'Nothing to Display'});
        else {
            res.status(200).send(data);
            console.log(data); 
        }
    })
    .catch((err) => {
        res.status(400).send({message: err.message ||'Some error occurred while getting Goals'});
    });
    } catch (err) {
        res.status(500).send({message: err.message ||'Error retrieving Goals'});
    }
};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['Goals']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid contact id to find a contact.');
          }
        const goalId = new ObjectId(req.params.id);
        Goal.find({ _id: goalId })
        .then((data) => {
            if(!data) res.status(404).send({message:'Nothing to Display'});
        else {
            res.status(200).send(data);
            console.log(data); 
        }
          })
          .catch((err) => {
            res.status(400).send({message: err.message || 'Some error occurred while retrieving your goal.'
            });
          });
    } catch (err) {
        res.status(500).send({message: err.message ||'Error retrieving Goal'});
    } 

};

const addOne = async (req,res,next) => {
    // #swagger.tags = ['Goals']
    try {
    const goal = new Goal(req.body);
    goal.save()
    .then((data) => {
        console.log(data);
        res.status(201).send(data);
    })
    .catch((err) =>{
        res.status(400).send({
            message: err.message || 'Some error occurred while creating the goal.'});
    });
    } catch (err) {
        res.status(500).sent({message: err.message ||'Error adding Goal'});
    }
        };

const editOne = async (req,res,next) => {
    // #swagger.tags = ['Goals']
    try {
    const goalId = new ObjectId(req.params.id)
    const goal = req.body;
    Goal.updateOne({ _id: goalId }, goal)
        .then((data) => {
            if(!data) res.status(404).send({message:'Nothing to Display'});
        else {
            res.status(202).send(data);
            console.log(data); 
        }
        })
        .catch((err) => {
            res.status(400).send({
                message: err.message || 'Error occurred while trying to update goal.'
            });
        });
    } catch (err)  {
        res.status(500).sent({message: err.message ||'Server Error While updating goal'});
    }
};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Goals']
    try {
        const goalId = req.params.id;
        Goal.deleteOne({_id: goalId })
        .then((data) => {
            if(!data) res.status(404).send({message:'No data with that ID'});
        else {
            res.status(202).send(data);
            console.log(data); 
        }
        }).catch((err) => {
            res.status(400).send({message: err.message ||'Some error ocurred while Deleting your goal'})
        });
    } catch (err) {
        res.status(500).sent({message: err.message ||'Server Error While Deleting goal'});
    }

};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }