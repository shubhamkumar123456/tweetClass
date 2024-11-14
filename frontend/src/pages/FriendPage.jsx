import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserById } from '../store/UserSlice'
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDistanceToNow } from 'date-fns';
import { FaCameraRetro } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useLocation } from 'react-router-dom';

const FriendPage = () => {

  const [userPosts, setuserPosts] = useState([]);
  console.log(userPosts)
 
  let location = useLocation()
  let userDetails = {user:location.state}
  console.log(userDetails)

  const getuserPosts = async()=>{
    let res = await axios.post(`http://localhost:8080/posts/getFriendPost`,{userId:userDetails.user._id})
    let data = res.data;
    console.log(data)
    setuserPosts(data.post)
  }

  useEffect(()=>{
    getuserPosts()
  },[userDetails.user._id])



  



  return (
    <div>
      <div className="rounded-3xl relative overflow-hidden shadow-xl w-[80%] m-auto  my-3 bg-blue-500">

  <img src={userDetails?.user?.coverPic?userDetails.user?.coverPic: 'https://images.pexels.com/photos/3377405/pexels-photo-3377405.jpeg?cs=srgb&dl=pexels-elina-araja-1743227-3377405.jpg&fm=jpg'} className="w-full object-cover object-center h-60" />

  <div className=" flex justify-center -mt-8">
  <div className='rounded-full relative w-24 h-24 border-solid border-white border-2 -mt-3'>
   
  <img src={userDetails?.user?.profilePic} className="rounded-full object-cover w-full h-full border-solid border-white border-2" />		
  </div>
  </div>
  <div className="text-center px-3 pb-6 pt-2">
    <h3 className="text-white text-sm bold font-sans">{userDetails?.user?.name}</h3>
    <p className="mt-2 font-sans font-light text-white">{userDetails?.user?.bio}</p>
  </div>
  <div className="flex justify-center pb-3 text-white">
    <div className="text-center mr-3 border-r pr-3">
      <h2>
        {userDetails?.user?.followers?.length}
      </h2>
      <span>Followers</span>
    </div>
    <div className="text-center">
      <h2> {userDetails?.user?.followings?.length}</h2>
      <span>Followings</span>
    </div>
  </div>
</div>

<div className='flex w-[80%] lg:flex-row flex-col lg:items-start items-center  flex-shrink-0 gap-5 m-auto mt-5'>
  {/* <div className='bg-gray-400 shrink-0 p-5 sm:w-[400px] w-max  h-max rounded-2xl'>
    <form action="" className=''>
      <label className='md:w-[150px] w-[100px] sm:inline-block block' htmlFor="">Name :</label>
      <input value={userInfo.name} name='name' onChange={handleInputChanger} className='rounded-md  my-2 text-black w-[200px] p-2' type="text" /><br />
      <label className='md:w-[150px] w-[100px] sm:inline-block block' htmlFor="">Email :</label>
      <input value={userInfo.email} name='email' disabled className='rounded-md my-2 text-black w-[200px] bg-white p-2' type="email" /><br />
      <label className='md:w-[150px] w-[100px] sm:inline-block block' htmlFor="">Update Password :</label>
      <input  className='rounded-md my-2 text-black w-[200px] p-2' name='password' onChange={handleInputChanger} type="password" /><br />
      <label className='md:w-[150px] w-[100px] sm:inline-block block' htmlFor="">Update Bio :</label>
      <input value={userInfo.bio} name='bio' onChange={handleInputChanger} className='rounded-md my-2 text-black w-[200px] p-2' type="text" /><br />
      <button onClick={handleUpdate} className='bg-green-950 text-white py-2 px-4 rounded-md hover:bg-green-800'>Update Details</button>
    </form>
  </div> */}
  <div className=' items-center flex flex-col   m-auto  w-full'>
      {
        userPosts?.map((ele)=>{
          return <div className='mb-4  sm:w-[450px] w-[250px]'>
  <div className="bg-gray-100 ">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <img src={ele.userId.profilePic} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-red-800" />
          <div>
            <p className="text-gray-800 font-semibold">{ele.userId.name}</p>
            <p className="text-gray-500 text-sm">{formatDistanceToNow(new Date(ele.createdAt), { addSuffix: true })}</p>
          </div>
        </div>
        <div className="text-gray-500 cursor-pointer">
          <button className="hover:bg-gray-50 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx={12} cy={7} r={1} />
              <circle cx={12} cy={12} r={1} />
              <circle cx={12} cy={17} r={1} />
            </svg>
          </button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-800">{ele.title} 🐱
        </p>
      </div>
      <div className="mb-4">
        {/* <img src="https://placekitten.com/400/300" alt="Post Image" className="w-full h-48 object-cover rounded-md" /> */}
        <Swiper
                  className='sm:h-[200px] sm:w-[300px] w-[80%]'
      spaceBetween={50}
      slidesPerView={1}
  
    >
      {
        ele.files.map((file)=>{
          return file.resource_type==='image'?<SwiperSlide>
  <img  src={file.url} className="" alt=""  />
          </SwiperSlide>:
          <SwiperSlide>
            <video className=' m-auto w-[80%]' controls autoPlay src={file.url}></video>   
          </SwiperSlide>
        })
      }
     
    </Swiper>
      </div>
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-2">
          <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>42 Likes</span>
          </button>
        </div>
        <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
          <svg width="22px" height="22px" viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z" />
            </g>
          </svg>
          <span>3 Comment</span>
        </button>
      </div>
      <hr className="mt-2 mb-2" />
      <p className="text-gray-800 font-semibold">Comment</p>
      <hr className="mt-2 mb-2" />
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <img src="https://placekitten.com/32/32" alt="User Avatar" className="w-6 h-6 rounded-full" />
          <div>
            <p className="text-gray-800 font-semibold">Jane Smith</p>
            <p className="text-gray-500 text-sm">Lovely shot! 📸</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <img src="https://placekitten.com/32/32" alt="User Avatar" className="w-6 h-6 rounded-full" />
          <div>
            <p className="text-gray-800 font-semibold">Bob Johnson</p>
            <p className="text-gray-500 text-sm">I can't handle the cuteness! Where can I get one?</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2 ml-6">
          <img src="https://placekitten.com/40/40" alt="User Avatar" className="w-6 h-6 rounded-full" />
          <div>
            <p className="text-gray-800 font-semibold">John Doe</p>
            <p className="text-gray-500 text-sm">That little furball is from a local shelter. You should check it out! 🏠😺</p>
          </div>
        </div>
      </div>
    </div>
  </div>
      
</div>
})}
</div>
</div>

    </div>
  )
}

export default FriendPage
