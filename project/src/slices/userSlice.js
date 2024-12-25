import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    loading: false,
    currentUser: null,
    error: null,
};

// Async thunk для регистрации пользователя
export const registerUser = createAsyncThunk('api/users/register', async (userData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, userData);
    return response.data; 
});

// Async thunk для логина пользователя
export const loginUser = createAsyncThunk('api/users/login', async ({ email, password }) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });
    return response.data;
});

// Async thunk для получения всех пользователей с пагинацией
export const fetchUsers = createAsyncThunk('api/users/getAllPagination', async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/getAllPagination?page=${page}&limit=${limit}`);
    return response.data.users; 
});

// Async thunk для получения пользователя по ID
export const getUserById = createAsyncThunk('api/users/getById', async (userId) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`);
    return response.data;
});

// Async thunk для обновления пользователя
export const updateUser = createAsyncThunk('api/users/update', async ({ userId, userData }) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}`, userData);
    return response.data; 
});

// Async thunk для удаления пользователя
export const deleteUser = createAsyncThunk('api/users/delete', async (userId) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`);
    return userId; 
});
export const adminAddUser = createAsyncThunk('api/users/register/admin', async (userData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, userData);
    return response.data; 
});
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload; 
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.user; 
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; 
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.currentUser = action.payload; 
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload; 
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(adminAddUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload); 
            })
            .addCase(adminAddUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

// Экспорт редьюсеров и действий
export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;