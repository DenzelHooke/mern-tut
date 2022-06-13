import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
   goals: [],
   isError: false,
   isLoading: false,
   fetchingGoals: false,
   message: '',
}

export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
   try {
      //* thunkAPI includes a great way to get *any* redux state.
      const token = thunkAPI.getState().auth.user.token
      return await goalService.createGoal(goalData, token);
   } catch (error) {
      const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
      //Rejects and passes value (message) as the payload
      return thunkAPI.rejectWithValue(message);
   }
})

// Underscore in params is used for when we don't need to pass any 
// values to our funcs and just need to use the thunkAPI.
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);

   } catch (error) {
      const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
      //Rejects and passes value (message) as the payload
      return thunkAPI.rejectWithValue(message);
   }
})

export const deleteGoal = createAsyncThunk('goals/deleteOne', async(goal_ID, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(token, goal_ID);
   } catch (error) {
      const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
      //Rejects and passes value (message) as the payload
      return thunkAPI.rejectWithValue(message);
   }
})


export const goalSlice = createSlice({
   name: 'goal',
   initialState: initialState,
   reducers: {
      // Sets state back to it's initial state.
      reset: (state) => initialState
   },
   extraReducers: (builder) => {
      builder
         //! Create Goals
         .addCase(createGoal.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.goals = [...state.goals, action.payload];
         })
         .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         //! Get Goals
         .addCase(getGoals.pending, (state) => {
            state.fetchingGoals = true;
            state.isLoading = true;
         })
         .addCase(getGoals.fulfilled, (state, action) => {
            state.fetchingGoals = false;
            state.isLoading = false;
            state.goals = action.payload;
         })
         .addCase(getGoals.rejected, (state, action) => {
            state.fetchingGoals = false;
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         //! Delete Goals
         .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.goals = state.goals.filter((goal) => {
               return goal._id != action.payload._id;
            })
            state.success = true;
         })
         .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
         })
   }
})

export const {reset} = goalSlice.actions;
export default goalSlice.reducer;