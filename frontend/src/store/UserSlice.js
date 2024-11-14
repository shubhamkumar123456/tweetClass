
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let userDetails = JSON.parse(localStorage.getItem('twitterLogin'))
const initialState = {
  login:userDetails? userDetails.login :false,
  token:userDetails? userDetails.token :'',
  user:userDetails? userDetails.user :'',
 
}

export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (token) => {
    const response = await axios.get('http://localhost:8080/users/getInfo',{
      headers:{
        'Authorization':token
      }
    })
    return response.data.user
  },
)

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setState: (state,action) => {
      console.log(action)
      state.login = true
      state.token = action.payload
      localStorage.setItem('twitterLogin',JSON.stringify({login:true,token:action.payload,user:''}));
    },
    getUserDetails: (state,action) => {
      state.value -= 1
    },
    logout: (state, action) => {
      localStorage.removeItem('twitterLogin')
      state.login = false;
      state.user = '';
       state.token = ''
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload)
      state.user = action.payload
      
    })
   
  
   
  },
})


export const { setState, decrement, logout } = UserSlice.actions

export default UserSlice.reducer