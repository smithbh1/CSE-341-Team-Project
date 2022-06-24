const db = require('../models')
const Diet = db.diets;
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res, next) => {
    // #swagger.tags = ['Diets']
};

const getSingle = async (req,res,next) => {
    // #swagger.tags = ['Diets']

};

const addOne = async (req,res,next) => {
    // #swagger.tags = ['Diets']

};

const editOne = async (req,res,next) => {
    // #swagger.tags = ['Diets']

};

const deleteOne = async (req,res,next) => {
    // #swagger.tags = ['Diets']

};

module.exports = { getAll, getSingle, addOne, editOne, deleteOne }