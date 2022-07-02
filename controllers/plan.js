const db = require('../models')
const Plan = db.plans;
// const ObjectId = require('mongodb').ObjectId;

module.exports.getAll = (req, res) => {
    // #swagger.tags = ['Plan']
    try {
        Plan.find({})
        .then((data) => {
            res.send(data);
            console.log(data);
        }).catch((err) => {
            res.status(500).send({message: err.message || 'Error retrieving your plan'});
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.getSingle = (req,res) => {
    // #swagger.tags = ['Plan']
    try {
        const planId = req.params.id;
        Plan.find({ _id: planId })
        .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || 'Some error occurred while retrieving your plan.'
            });
          });
    } catch (err) {
        res.status(500).json(err);
    } 
};

module.exports.addOne = (req,res) => {
    // #swagger.tags = ['Plan']
    try {
        const plan = new Plan(req.body);
        plan.save()
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        }).catch((err) => {
            res.status(500).send({message: err.message || 'Some error ocurred while creating your plan'});
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.editOne = (req,res,next) => {
    // #swagger.tags = ['Plan']

};

module.exports.deleteOne =(req,res,next) => {
    // #swagger.tags = ['Plan']

};