const {Router} = require('express')
const {postCtrl} = require('../controllers')

const route = Router();

route.get('/', postCtrl.getAll);
route.get('/:id', postCtrl.getById);
route.post('/', postCtrl.create);
route.put('/:id', postCtrl.updateById);
route.delete('/:id', postCtrl.deleteById);

module.exports = route;
