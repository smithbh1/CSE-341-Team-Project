const db = require('../models')
const Workout = db.workouts;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['Workouts']
    Workout
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
            message: 'Error retrieving Workout',
            error: err
        });
    });
};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['Workouts']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid workout id to find a workout.');
      }
      const userId = new ObjectId(req.params.id);
      Workout
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
    // #swagger.tags = ['Workouts']
    const workout = new Workout(req.body);
    workout.save()
    .then((data) => {
        console.log(data);
        res.status(201).send(data);
    })
    .catch((err) =>{
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the workout.'});
    });

        };

const editOne = async (req,res,next) => {
    // #swagger.tags = ['Workout']

};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Workout']

};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }