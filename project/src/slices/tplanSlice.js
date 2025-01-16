import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
const axios = require('axios')

export const fetchTrainingPlans = createAsyncThunk('api/trainingplans/getAllSearch', async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/trainingplans/getAllSearch`);
    return response.data;
});
export const adminAddPlan = createAsyncThunk('api/trainingplans', async (planData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/trainingplans`, planData);
    return response.data; 
});

export const deleteTrainingPlan = createAsyncThunk('api/trainingplans/delete', async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/trainingplans/${id}`);
    return id; 
});

export const updateTrainingPlan = createAsyncThunk('trainingPlan/update', async ({ id, ...updatedData }) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/trainingplans/${id}`, updatedData); // Убедитесь, что URL соответствует вашему API
    return response.data;
});
export const findFavPlans = createAsyncThunk('api/trainingplans/findFavPlans', async (_, {rejectWithValue}) => {
    try{
        const favPlans = JSON.parse(localStorage.getItem('favPlans'));
        console.log(favPlans);

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/trainingplans/findFavPlans`, {
            params: { favPlans: JSON.stringify(favPlans) } 
        });
        return response.data;
    }
    catch(error){
        rejectWithValue(error)
    }
    
});

const trainingPlansSlice = createSlice({
    name: 'trainingplans',
    initialState: {
        plans: [],
        favPlans: [],
        currentPlan: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setCurrentPlan: (state, action) => {
            state.currentPlan = action.payload;
        },
        removePlan: (state, action) => {
            state.plans = state.plans.filter(plan => plan.idTplan !== action.payload);
            if (state.currentPlan && state.currentPlan.idTplan === action.payload) {
                state.currentPlan = null; 
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrainingPlans.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTrainingPlans.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.plans = action.payload; 
            })
            .addCase(fetchTrainingPlans.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(adminAddPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.plans.push(action.payload); 
            })
            .addCase(adminAddPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTrainingPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = state.plans.filter(plan => plan.idTplan !== action.payload);
                if (state.currentPlan && state.currentPlan.idTplan === action.payload) {
                    state.currentPlan = null; 
                }
            })
            .addCase(deleteTrainingPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTrainingPlan.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.plans.findIndex(plan => plan.idTplan === action.payload.idTplan);
                if (index !== -1) {
                    state.plans[index] = action.payload; 
                }
                if (state.currentPlan && state.currentPlan.idTplan === action.payload.idTplan) {
                    state.currentPlan = action.payload; 
                }
            })
            .addCase(updateTrainingPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(findFavPlans.fulfilled, (state, action)=>{
                state.loading = false;
                state.favPlans = action.payload;
            })
            .addCase(findFavPlans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { setCurrentPlan, removePlan  } = trainingPlansSlice.actions; 
export default trainingPlansSlice.reducer;