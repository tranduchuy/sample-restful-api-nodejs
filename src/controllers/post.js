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
        limit: limit,
        order: [
            ['updatedAt', 'DESC']
        ]
    })

    return res.status(HttpStatus.OK).json(posts);
}

const getById = async (req, res) => {
    const {value, error} = getPostByIdSchema.validate({id: req.params.id});
    if (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            errors: collectErrorMessage(error)
        });
    }
    const post = await Post.findByPk(value.id);
    if (!post) {
        return res.status(HttpStatus.NOT_FOUND).json(null)
    }

    return res.status(HttpStatus.OK).json(post)

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

const deleteById = async (req, res) => {
    const {value, error} = getPostByIdSchema.validate({id: req.params.id});
    if (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            errors: collectErrorMessage(error)
        });
    }
    const post = await Post.findByPk(value.id);
    if (!post) {
        return res.status(HttpStatus.NOT_FOUND).json(null)
    }

    await Post.destroy({
        where: {
            id: value.id
        }
    });
    return res.status(HttpStatus.OK).json({})
}

const updateById = async (req, res) => {
    const {value, error} = getPostByIdSchema.validate({id: req.params.id});
    if (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            errors: collectErrorMessage(error)
        });
    }

    const {value: updateInfo, error: updateError} = updatePostSchema.validate(req.body);
    if (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            errors: collectErrorMessage(updateError)
        });
    }


    const post = await Post.findByPk(value.id);
    if (!post) {
        return res.status(HttpStatus.NOT_FOUND).json(null)
    }
    Object.assign(post, updateInfo);
    await post.save();
    return res.status(200).json(post);
}

module.exports = {
    getAll, getById, create, deleteById, updateById
}
