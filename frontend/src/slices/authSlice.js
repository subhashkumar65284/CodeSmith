import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosClient from '../utils/axiosClient'

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, {rejectWithValue}) => {
        try{
            const response = await axiosClient.post('auth/register',userData);
            return response.data.user;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, {rejectWithValue}) => {
        try{
            const response = await axiosClient.post('auth/login',userData);
            return response.data.user;
        }catch(err){
            console.log(err)
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/check',
    async (_, {rejectWithValue}) => {
        try{
            const response = await axiosClient.get('auth/check');
            return response.data.user;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try{
            await axiosClient.post('auth/logout');
            return null;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
      user:null,
      isAuthenticated:false,
      loading:true,
      error:null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    //register user cases
    builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
    })
    builder.addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Something went wrong'
    })

    //login user cases
    builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
    })
    builder.addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Something went wrong'
    })

    //check user cases
    builder.addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null
    })
    builder.addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
    })
    builder.addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Something went wrong'
    })

    //logout user cases
    builder.addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null
    })
    builder.addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Something went wrong'
    })
  }
})

export default authSlice.reducer