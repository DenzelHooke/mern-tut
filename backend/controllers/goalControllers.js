// asynchandler Allows us to automatically pass our async errors to our  
// express error handler instead of using try catch syntax.
const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
})

// @desc Create Goal
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    // res.status(400).json({message: 'please enter text'})
    // return
    //* using express builtin error handler
    res.status(400);
    throw new Error('Please enter text');
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
})

// @desc Update Goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error('Please enter an id.')
  }

  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found.');
  }

  //Check if user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found.')
  }

  if (req.user.id != goal.user.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.status(200).json(updatedGoal);
})

// @desc Deleet goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error('Please enter an id.')
  }

  const goal = await Goal.findById(req.params.id);
  
  if (!goal) { 
    res.status(400);
    throw new Error("Goal does not exist to delete.")
  }

  //Check if user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found.')
  }

  if (req.user.id != goal.user.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const deletedGoal = await Goal.findOneAndDelete(goal);
  res.status(200).json(deletedGoal);
  console.log(deletedGoal);
})


module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
}