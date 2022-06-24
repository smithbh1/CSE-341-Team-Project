const db = require('../models')
const Goal = db.goals;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['Goals']

};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['Goals']

};

const addOne = async (req,res,next) => {
    // #swagger.tags = ['Goals']

};

const editOne = async (req,res,next) => {
    // #swagger.tags = ['Goals']

};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Goals']

};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }