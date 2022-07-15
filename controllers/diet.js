const db = require('../models');
const diet = require('../models/diet');
const Diet = db.diets;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['Diets']
    try {
    Diet
    .find()
    .then((data) => {
        if(!data) res.status(404).send({message:'Nothing to Display'});
        else {
            res.status(200).send(data);
            console.log(data);            
        }
    }).catch((err) => {
        res.status(400).send({message: err.message ||'Some error occurred while getting diets'})
    })}
    catch(err) {
        res.status(500).send({message: err.message ||'Error retrieving Diet'});
    };
};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['Diets']
    try{
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id.');
      }
      const dietId = new ObjectId(req.params.id);
      Diet.find({_id: dietId})
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
        res.status(500).send({message: err.message ||'Error retrieving Diet'});
      }

};

const addOne = async (req,res,next) => {
    // #swagger.tags = ['Diets']
    try {
    const diet = new Diet(req.body);
    diet.save()
    .then((data) => {
        console.log(data);
        res.status(201).send(data);
    })
    .catch((err) =>{
        res.status(400).send({
            message: err.message || 'Some error occurred while creating the diet.'});
    });
    } catch (err) {
        res.status(500).send({message: err.message ||'Error adding Diet'});
    }

        };

const editOne = async (req,res,next) => {
    // #swagger.tags = ['Diets']
    try{
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid id.');
          }
        const dietID = req.params.id;
        const diet = req.body
        Diet.updateOne({_id: dietID }, diet)
        .then((data) => {
            if(!data) res.status(404).send({message:'No data with that ID'});
        else {
            res.status(202).send(data);
            console.log(data); 
        }
        }).catch((err) => {
            res.status(400).send({message: err.message || 'Some error ocurred while updating your diet'})
        });
    } catch (err) {
        res.status(500).sent({message: err.message ||'Server Error While updating Diet'});
    }
};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Diets']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid id.');
          }
        const dietId = req.params.id;
        Diet.deleteOne({_id: dietId })
        .then((data) => {
            if(!data) res.status(404).send({message:'No data with that ID'});
        else {
            res.status(202).send(data);
            console.log(data); 
        }
        }).catch((err) => {
            res.status(400).send({message: err.message ||'Some error ocurred while Deleting your diet'})
        });
    } catch (err) {
        res.status(500).sent({message: err.message ||'Server Error While Deleting Diet'});
    }

};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }