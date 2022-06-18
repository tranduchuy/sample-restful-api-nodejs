const {Router} = require('express');
const postRoute = require('./post');

const route = Router();

route.use('/posts', postRoute);


module.exports = route;
