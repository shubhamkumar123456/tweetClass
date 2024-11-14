import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserById } from '../store/UserSlice'
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'

import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Sidebar from '../components/Sidebar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart } from "react-icons/fa";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { toast } from 'react-toastify';
import { Modal } from 'antd';



const Home = () => {

  const [commentInput, setcommentInput] = useState("");
  const [seletctedObj, setseletctedObj] = useState('');
  //store redux part
  let dispatch = useDispatch()
  let userDetails = useSelector((state) => state.user)
  let token = userDetails.token
  let loginUserId =  userDetails?.user?._id
  // console.log(token)
  // console.log(userDetails)



  const [Allposts, setAllposts] = useState([]);
  async function getAllUSersPost() {
    let res = await axios.get('http://localhost:8080/posts/getAllPost');
    let data = res.data;
    console.log(data.posts)
    setAllposts(data.posts)
  }

  useEffect(() => {
    getAllUSersPost()
  }, [])

  const [swiperKey, setSwiperKey] = useState(0);

  useEffect(() => {
    // Force Swiper to reinitialize after component mount
    setTimeout(() => setSwiperKey((prev) => prev + 1), 0);
  }, [Allposts]);

// ***********************comment section starts here*********************************

const [isModalOpen, setIsModalOpen] = useState(false);

const showModal = () => {
  setIsModalOpen(true);
};

const handleOk = () => {
  setIsModalOpen(false);
};

const handleCancel = () => {
  setIsModalOpen(false);
};
const selectedCommentInput = (obj)=>{
  console.log(obj)
  setseletctedObj(obj)
}
  const commentChanger = (e)=>{
    setcommentInput(e.target.value)
  }
  const handleCommentSubmit = async(postId)=>{
    console.log("running")
    console.log(commentInput)
    console.log(token)
    console.log(postId)
    let res = await axios.post(`http://localhost:8080/posts/comment/${postId}`,{text:commentInput},{
      headers:{
        'Authorization':token
      }
    })

    let data = res.data;
    console.log(data)
    if(data.success){
        toast.success(data.msg,{position:"bottom-right",theme:"dark"})
        setcommentInput('')
      getAllUSersPost()
    }
    else{
      setcommentInput('')
      toast.error(data.msg,{position:"bottom-right",theme:"dark"})
    }
  }

  const handleLikes = async(id)=>{
    // console.log(seletctedObj)
    console.log(id)
    let res = await axios.post(`http://localhost:8080/posts/likePost/${id}`,{name:"hello"},{
      headers:{
        'Authorization':token
      }
    })
    console.log(res.data)
    if(res.data.success){
      getAllUSersPost()
    }
  }

  return (
    <div>
      <div className='w-full bg-orange flex gap-2'>
        <div className="left w-1/6 bg-red-300">
          <Sidebar getAllUSersPost={getAllUSersPost}/>

        </div>
        <div className="right w-full">
          <div className=''>
            {
              Allposts.map((ele, i) => {
                

                return <Card
                onClick={()=>selectedCommentInput(ele)}
                key={ele._id}
                  className="w-80 mx-auto my-3"
                  variant="outlined"
                  sx={{ '--Card-radius': (theme) => theme.vars.radius.xs }}
                >
                  <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          m: '-2px',
                          borderRadius: '50%',
                          background:
                            'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                        },
                      }}
                    >
                      <Avatar
                        size="sm"
                        src="/static/logo.png"
                        sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
                      />
                    </Box>

                    <Typography className='capitalize' sx={{ fontWeight: 'lg' }}>{ele.userId.name}</Typography>
                    <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                      <MoreHoriz />
                    </IconButton>
                  </CardContent>
                  <p>{ele.title}</p>
                  <div className="w-full flex gap-1 h-[200px]">

                  <Swiper
                  className='h-[200px]'
      spaceBetween={50}
      slidesPerView={1}
      // onSlideChange={() => }
      // onSwiper={(swiper) => }
    >
      {
        ele.files.map((file,i)=>{
          return file.resource_type==='image'?<SwiperSlide key={i}>
  <img  src={file.url} className="" alt=""  />
          </SwiperSlide>:
          <SwiperSlide key={i}>
            <video className='w-[70%] m-auto' controls muted autoPlay src={file.url}></video>   
          </SwiperSlide>
        })
      }
     
    </Swiper>


                   {/* {ele.files.map((file)=>{
                      return file.resource_type==='image'?  <img  src={file.url} className=" w-[100%] h-[100%] object-contain" alt="" loading="lazy" />:<video controls className='w-[100%] h-[100%] object-contain' src={file.url}></video>
                    })}  */}
                  </div>
                
                  <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
                    <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                  {  ele.likes.includes(loginUserId) ? 
                      <IconButton variant="plain" color="neutral" size="sm">
                       
                      <FaHeart color='red' size={30}  sx={{fill:'red'}}   onClick={()=>handleLikes(ele._id)}/><sup> {ele.likes.length}</sup>
                      </IconButton>  :<IconButton variant="plain" color="neutral" size="sm">
                       
                        <FavoriteBorder   onClick={()=>handleLikes(ele._id)}/><sup> {ele.likes.length}</sup>
                      </IconButton>
                    }
                      <IconButton variant="plain" color="neutral" size="sm">
                        <ModeCommentOutlined onClick={showModal}/>
                      </IconButton>
                      <IconButton variant="plain" color="neutral" size="sm">
                        <SendOutlined />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
                      {[...Array(5)].map((_, index) => (
                        <Box
                          key={index}
                          sx={[
                            {
                              borderRadius: '50%',
                              width: `max(${6 - index}px, 3px)`,
                              height: `max(${6 - index}px, 3px)`,
                            },
                            index === 0
                              ? { bgcolor: 'primary.solidBg' }
                              : { bgcolor: 'background.level3' },
                          ]}
                        />
                      ))}
                    </Box>
                    <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
                      <IconButton variant="plain" color="neutral" size="sm">
                        <BookmarkBorderRoundedIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                  <CardContent>
                    {/* <Link
                      component="button"
                      underline="none"
                      textColor="text.primary"
                      sx={{ fontSize: 'sm', fontWeight: 'lg' }}
                    >
                    
                    </Link> */}
                    <Typography sx={{ fontSize: 'sm' }}>
                      <Link
                        component="button"
                        color="neutral"
                        textColor="text.primary"
                        sx={{ fontWeight: 'lg' }}
                      >

                      </Link>
                      {ele.description}
                    </Typography>
                    <Link
                      component="button"
                      underline="none"
                      startDecorator="…"
                      sx={{ fontSize: 'sm', color: 'text.tertiary' }}
                    >
                      more
                    </Link>
                    <Link
                      component="button"
                      underline="none"
                      sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
                    >
                      2 DAYS AGO
                    </Link>
                  </CardContent>
                  <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                    <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                      <Face />
                    </IconButton>
                    <Input
                      onChange={commentChanger}
                     
                      value={seletctedObj._id===ele._id?commentInput :''}
                      variant="plain"
                      size="sm"
                      placeholder="Add a comment…"
                      sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
                    />
                    <button onClick={()=>handleCommentSubmit(ele._id)}   underline="none" role="button">
                      Post
                    </button>
                  </CardContent>
                </Card>

              
              })
            }
          </div>
        </div>
      </div>

      <div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     <section className="relative flex items-center justify-center min-h-screen antialiased bg-white bg-gray-100 min-w-screen">
  <div className="container px-0 mx-auto sm:px-5">
 
  {
    seletctedObj?.comments?.map((ele)=>{
      return   <div className="flex-col w-full py-4 mx-auto mt-3 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm ">
      <div className="flex flex-row md-10">
        <img className="w-12 h-12 border-2 border-gray-300 rounded-full" alt="Anonymous's avatar" src={ele.userId.profilePic} />
        <div className="flex-col mt-1">
          <div className="flex items-center flex-1 px-4 font-bold leading-tight">{ele.userId.name}
            <span className="ml-2 text-xs font-normal text-gray-500">{formatDistanceToNow(new Date(ele.createdAt), { addSuffix: true })}</span>
          </div>
          <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">{ele.text}
          </div>
          <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
            <svg className="w-5 h-5 ml-2 text-gray-600 cursor-pointer fill-current hover:text-gray-900" viewBox="0 0 95 78" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z" fillRule="nonzero" />
            </svg>
          </button>
          <button className="inline-flex items-center px-1 -ml-1 flex-column">
            <svg className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
              </path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    })
  }
  </div>
</section>


      </Modal>
      </div>


    <div className='w-[50%] bg-blue-200'>
  
    </div>
    </div>
  )
}

export default Home
