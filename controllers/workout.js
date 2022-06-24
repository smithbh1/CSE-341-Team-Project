const db = require('../models')
const Workout = db.workouts;
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // #swagger.tags = ['Workout']

};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['Workout']

};

const addOne = async (req,res,next) => {
    // #swagger.tags = ['Workout']

};

const editOne = async (req,res,next) => {
    // #swagger.tags = ['Workout']

};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Workout']

};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }