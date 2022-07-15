const db = require('../models');
const user = require('../models/user');
const User = db.users;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['User']
    try {
        User
        .find()
        .then((data) => {
            if(!data) res.status(404).send({message:'Nothing to Display'});
            else {
                res.status(200).send(data);
                console.log(data);            
            }
        }).catch((err) => {
            res.status(400).send({message: err.message ||'Some error occurred while getting Users'})
        })}
        catch(err) {
            res.status(500).send({message: err.message ||'Error retrieving User'});
        };
};

const getSingle = async (req, res, next) => {
    // #swagger.tags = ['User']
    try{
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid id.');
          }
          const userId = new ObjectId(req.params.id);
          User.find({_id: userId})
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
            res.status(500).send({message: err.message ||'Error retrieving user'});
          }
};

const addOne = async (req, res, next) => {
    // #swagger.tags = ['User']
    try {
        const user = new User(req.body);
        user.save()
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) =>{
            res.status(400).send({
                message: err.message || 'Some error occurred while creating the user.'});
        });
        } catch (err) {
            res.status(500).send({message: err.message ||'Error adding user'});
        }
};

const editOne = async (req, res, next) => {
    // #swagger.tags = ['User']
    try{
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid id.');
          }
        const userID = req.params.id;
        const user = req.body
        User.updateOne({_id: userID }, user)
        .then((data) => {
            if(!data) res.status(404).send({message:'No data with that ID'});
        else {
            res.status(202).send(data);
            console.log(data); 
        }
        }).catch((err) => {
            res.status(400).send({message: err.message || 'Some error ocurred while updating your user'})
        });
    } catch (err) {
        res.status(500).sent({message: err.message ||'Server Error While updating user'});
    }
};

const deleteOne = async (req, res, next) => {
    // #swagger.tags = ['User']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid id.');
          }
        const userId = req.params.id;
        User.deleteOne({_id: userId })
        .then((data) => {
            if(!data) res.status(404).send({message:'No data with that ID'});
        else {
            res.status(202).send(data);
            console.log(data); 
        }
        }).catch((err) => {
            res.status(400).send({message: err.message ||'Some error ocurred while Deleting your user'})
        });
    } catch (err) {
        res.status(500).sent({message: err.message ||'Server Error While Deleting user'});
    }
};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }