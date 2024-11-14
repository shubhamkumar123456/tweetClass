
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PNF from './pages/PNF';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import Trial from './pages/Trial';
import { fetchUserById } from './store/UserSlice';
import Navbar from './components/Navbar';
import ProfilePage from './pages/ProfilePage';
import ForgetPassword from './pages/ForgetPassword';
import FriendPage from './pages/FriendPage';



function App() {
 
  let dispatch = useDispatch()
  let userDetails = useSelector((state)=>state.user)
  let login = userDetails.login;
  let token = userDetails.token;
  // console.log(login)

  

  useEffect(()=>{
    dispatch(fetchUserById(token))
  },[token])

  return (
    <div className="App">
      <BrowserRouter>
     <div className='mb-[80px]'>
     <Navbar/>
     </div>
        <Routes>
            <Route path='/' element={login===true? <Home/> : <Navigate to={'/login'}/>} />
            <Route path='/login' element={login===false? <Login/> :<Navigate to='/'/>} />
            <Route path='/register' element={login===false? <Signup/> :<Navigate to={'/'}/>} />
            <Route path='/trial' element={<Trial/>} />
            <Route path='/profile' element={login===true? <ProfilePage/> : <Navigate to={'/login'}/>} />
            <Route path='/forget-password' element={<ForgetPassword/>}/>
            <Route path='/friendPage' element={<FriendPage/>}/>
            <Route path='/*' element={<PNF/>} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
