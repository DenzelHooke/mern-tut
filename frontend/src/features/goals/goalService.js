import axios from 'axios';

const API_URL = 'http://localhost:8000/api/goals/';


const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, goalData, config);

    return response.data;
}

const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);

    return response.data;
}

const deleteGoal = async (token, goal_ID) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL+goal_ID, config);

    return response.data;
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
}

export default goalService;