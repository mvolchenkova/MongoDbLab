const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.post('/', recipeController.createRecipe);
router.get('/getAllPagination', recipeController.getAllPagination)
router.get('/getAllSort', recipeController.getAllSort)
router.get('/getAllSearch', recipeController.search)
router.get('/:id', recipeController.getById)
router.put('/:id', recipeController.update)
router.delete('/:id', recipeController.delete)

module.exports = router;