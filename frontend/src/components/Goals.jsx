import React from 'react'
import GoalItem from '../components/GoalItem';
import { useSelector, useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice';


function Goals({ goals }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)

  const onClick = (goal) => {
    const token = user.token;
    dispatch(deleteGoal(goal, token));
  }

  return (
    <>
      {goals.map((goal) => {
        return (
          <GoalItem key={goal._id} goal={goal} onClick={onClick} />
        )
        })
      }
    </>
  )
}

export default Goals