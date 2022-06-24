const db = require('../models')
const User = db.users;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['User']
    
};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['User']

};

const addOne = async (req,res,next) => {
    // #swagger.tags = ['User']

};

const editOne = async (req,res,next) => {
    // #swagger.tags = ['User']

};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['User']

};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }