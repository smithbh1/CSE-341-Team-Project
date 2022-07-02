const db = require('../models')
const Plan = db.plans;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['Plan']
    Plan
    .find()
    .then((data) => {
        if(!data) {
            res.status(404).send({message:'No plans to display'})
        } else {
            res.send(data);
            console.log(data);
        }
    }).catch((err) => {
        res.status(500).send({message: 'Error retrieving your plan', error: err});
    });
};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['Plan']
    if(!ObjectId.isValid(req.params.id)) {
        res.status(404).json('Must use a valid id to find the right plan');
    }
    const planId = new ObjectId(req.params.id);
    Plan
    .find({ _id: planId })
    .toArray((err, result) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
};

const addOne = async (req,res,next) => {
    // #swagger.tags = ['Plan']
    const plan = new Plan(req.body);
    plan.save()
    .then((data) => {
        console.log(data);
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message: err.message || 'Some error ocurred creating your plan'});
    });
};

const editOne = async (req,res,next) => {
    // #swagger.tags = ['Plan']

};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Plan']

};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }