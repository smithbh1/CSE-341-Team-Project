const db = require('../models');
const user = require('../models/user');
const User = db.users;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['User']
    User
        .find()
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: 'No pusers to display' })
            } else {
                res.send(data);
                console.log(data);
            }
        }).catch((err) => {
            res.status(500).send({ message: 'Error retrieving your plan', error: err });
        });
};

const getSingle = async (req, res, next) => {
    // #swagger.tags = ['User']
    const userId = new ObjectId(req.params.id);
    User
        .find({ _id: userId })
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error occured while finding that user.'
            });
        });
};

const addOne = async (req, res, next) => {
    // #swagger.tags = ['User']
    const user = new User(req.body);
    user.save()
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error occured while making user contact.'
            });
        });
};

const editOne = async (req, res, next) => {
    // #swagger.tags = ['User']
    const userId = new ObjectId(req.params.id)
    const user = req.body;
    User
        .replaceOne({ _id: userId }, user)
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error occured while trying to update user.'
            });
        });
};

const deleteOne = async (req, res, next) => {
    // #swagger.tags = ['User']

    User
        .deleteOne()
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error occured while trying to delete user.'
            });
        });
};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }