const db = require('../models')
const User = db.users;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['User']
    User
        .find()
        .then((data) => {
            if (!data) res.status(404).send({ message: 'Nothing to Display' });
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

const getSingle = async (req, res, next) => {
    // #swagger.tags = ['User']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Use a valid user id');
    }
    const userId = new ObjectId(req.params.id);
    User
        .find({ _id: userId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
};

const addOne = async (req, res, next) => {
    // #swagger.tags = ['User']
    const userInfo = new User(req.body);
    userInfo.save()
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Error occured while making user contact info.'
            });
        });
};

const editOne = async (req, res, next) => {
    // #swagger.tags = ['User']

};

const deleteOne = async (req, res, next) => {
    // #swagger.tags = ['User']

};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }