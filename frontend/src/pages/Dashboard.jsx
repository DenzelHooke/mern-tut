import {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { reset, getGoals} from '../features/goals/goalSlice';
import GoalForm from '../components/GoalForm';
import Goals from '../components/Goals';
import Spinner from '../components/Spinner';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, fetchingGoals, isError, message } = useSelector((state) => state.goal)

  useEffect(() => {
    if(!user) {
      navigate('/login');
      toast.warning('You must login first to view the dashboard.');
    } else {
      toast.success('Welcome!', {
        autoClose: 2300,
      });
    }

    dispatch(getGoals())

    // Reset state on dismount
    return () => dispatch(reset())
  }, [user, navigate, dispatch])

  useEffect(() => {
    if(isError) {
      toast.error(message);
      dispatch(reset());
    }

  }, [isError, message, dispatch])
  
  // useEffect(() => {
  //   if(fetchingGoals) {
  //     toast.info('Fetching your goals', {
  //         autoClose: 1500,
  //       }
  //     )
  //   }

  // }, [fetchingGoals])

  if(isLoading) {
    return <Spinner />
  }

  return (
     <>
      <section className="heading">
        <h1> Welcome {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm/>
      {goals.length > 0 ? 
        <Goals goals={goals}/>
        :
        <p>You have no goals created yet..</p>
      }
     </>
  )
}

export default Dashboard