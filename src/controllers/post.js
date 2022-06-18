const {Post} = require('../models');
const {HttpStatus} = require('easy-http-code');
const {getAllPostsSchema, createPostSchema, updatePostSchema, getPostByIdSchema} = require('../validate-schemas');

const collectErrorMessage = (joiError) => {
    if (!joiError) {
        return [];
    }

    return joiError.details.map(o => o.message)
}

const getAll = async (req, res) => {
    const {value, error} = getAllPostsSchema.validate(req.query);
    if (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            errors: collectErrorMessage(error)
        });
    }

    const {limit, page} = value;
    const posts = await Post.findAll({
        offset: page * limit,
        limit: limit
    })

    return res.status(HttpStatus.OK).json(posts);
}

const getById = (req, res) => {
    return res.status(200).json({})

}
const create = async (req, res) => {
    const {value, error} = createPostSchema.validate(req.body);
    if (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            errors: collectErrorMessage(error)
        });
    }

    const newPost = await Post.create(value);
    await newPost.save();
    return res.status(HttpStatus.CREATED).json(newPost);
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
