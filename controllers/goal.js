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
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
      }
      const userId = new ObjectId(req.params.id);
      Goal
      .find({_id: userId})
      .toArray((err, result) => {
        if (err){
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });

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

};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Goals']

};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }