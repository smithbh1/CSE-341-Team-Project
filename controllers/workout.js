const db = require('../models');
const workout = require('../models/workout');
const Workout = db.workouts;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['Workouts']
    try {
        Workout
        .find()
        .then((data) => {
            if(!data) res.status(404).send({message:'Nothing to Display'});
            else {
                res.status(200).send(data);
                console.log(data);            
            }
        }).catch((err) => {
            res.status(400).send({message: err.message ||'Some error occurred while getting Workouts'})
        })}
        catch(err) {
            res.status(500).send({message: err.message ||'Error retrieving Workout'});
        };
};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['Workouts']
    try{
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid id.');
          }
          const workoutId = new ObjectId(req.params.id);
          Workout.find({_id: workoutId})
          .then((data) => {
            if(!data) res.status(404).send({message:'Nothing to Display'});
            else {
                res.status(200).send(data);
                console.log(data); 
            }
          }).catch((err) => {
            res.status(400).send({message: err.message ||'Nothing was found'})
          })
        } catch(err) {
            res.status(500).send({message: err.message ||'Error retrieving workout'});
          }
    

};

const addOne = async (req,res,next) => {
    // #swagger.tags = ['Workouts']
    try {
        const workout = new Workout(req.body);
        workout.save()
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) =>{
            res.status(400).send({
                message: err.message || 'Some error occurred while creating the workout.'});
        });
        } catch (err) {
            res.status(500).send({message: err.message ||'Error adding workout'});
        }
};

const editOne = async (req,res,next) => {
    // #swagger.tags = ['Workout']
    try{
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid id.');
          }
        const workoutID = req.params.id;
        const workout = req.body
        Workout.updateOne({_id: workoutID }, workout)
        .then((data) => {
            if(!data) res.status(404).send({message:'No data with that ID'});
        else {
            res.status(202).send(data);
            console.log(data); 
        }
        }).catch((err) => {
            res.status(400).send({message: err.message || 'Some error ocurred while updating your workout'})
        });
    } catch (err) {
        res.status(500).sent({message: err.message ||'Server Error While updating workout'});
    }
};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Workout']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid id.');
          }
        const workoutId = req.params.id;
        Workout.deleteOne({_id: workoutId })
        .then((data) => {
            if(!data) res.status(404).send({message:'No data with that ID'});
        else {
            res.status(202).send(data);
            console.log(data); 
        }
        }).catch((err) => {
            res.status(400).send({message: err.message ||'Some error ocurred while Deleting your workout'})
        });
    } catch (err) {
        res.status(500).sent({message: err.message ||'Server Error While Deleting workout'});
    }
};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }