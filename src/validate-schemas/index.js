const Joi = require('joi');

const getAllPostsSchema = Joi.object({
    limit: Joi.number().max(100).default(10),
    page: Joi.number().default(0),
});

// can be used for getting one post or deleting one post
const getPostByIdSchema = Joi.object({
    id: Joi.number().min(1).required()
});

const createPostSchema = Joi.object({
    title: Joi.string().min(6).max(100).required(),
    content: Joi.string().min(1).required(),
    thumbnail: Joi.string()
});

const updatePostSchema = Joi.object({
    title: Joi.string().min(6).max(100),
    content: Joi.string().min(1),
    thumbnail: Joi.string()
});

module.exports = {
    getAllPostsSchema,
    getPostByIdSchema,
    createPostSchema,
    updatePostSchema
}
