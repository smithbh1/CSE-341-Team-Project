const db = require('../models');
const diet = require('../models/diet');
const Diet = db.diets;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['Diets']
    Diet
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
            message: 'Error retrieving Diet',
            error: err
        });
    });
};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['Diets']
    try {
      const userId = new ObjectId(req.params.id);
      Diet
      .find({_id: userId})
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
    // #swagger.tags = ['Diets']
    const diet = new Diet(req.body);
    diet.save()
    .then((data) => {
        console.log(data);
        res.status(201).send(data);
    })
    .catch((err) =>{
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the diet.'});
    });

        };

const editOne = async (req,res,next) => {
    // #swagger.tags = ['Diets']
 
      const userId = new ObjectId(req.params.id);
      const diet = req.body
      Diet
      .replaceOne({_id: userId}, diet)
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Error occured while trying to update diet.'
        });
    });
};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Diets']
    Diet
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