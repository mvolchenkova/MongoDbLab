const express = require('express');
const router = express.Router();
const trainingPlanController = require('../controllers/trainingPlanController');

router.post('/', trainingPlanController.createTrainingPlan);
router.get('/getAllPagination', trainingPlanController.getAllPagination)
router.get('/getAllSort', trainingPlanController.getAllSort)
router.get('/getAllSearch', trainingPlanController.search)
router.get('/:id', trainingPlanController.getById)
router.put('/:id', trainingPlanController.update)
router.delete('/:id', trainingPlanController.delete)

module.exports = router;