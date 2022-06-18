const {Post} = require('../models');

const getAll = async (req, res) => {
    return res.status(200).json({
        posts: await Post.findAll()
    })
}

const getById = (req, res) => {
    return res.status(200).json({})

}
const create = (req, res) => {
    return res.status(200).json({})
}

const deleteById = (req, res) => {
    return res.status(200).json({})
}

const updateById = (req, res) => {
    return res.status(200).json({})
}

module.exports = {
    getAll, getById, create, deleteById, updateById
}
