//* Handles all of our routes
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalControllers');

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// /api/goals/
router.route('/').get(protect, getGoals).post(protect, createGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

//* different ways of doing routes 

// router.get('/', getGoals);
// router.post('/', createGoal);
// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);

module.exports = router