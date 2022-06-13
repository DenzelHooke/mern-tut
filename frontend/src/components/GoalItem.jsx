import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';


function GoalItem({ goal, onClick}) {


  return (
    <div className="goal">
      <div>
        {new Date(goal.createdAt).toLocaleString('en-US')}
      </div>
      <h2>{goal.text}</h2>
      <button className="close"><FaTrashAlt id='deleteBtn' onClick={() => onClick(goal._id)}/></button>
    </div>
  )
}

export default GoalItem