import React, { useRef, useState } from 'react'
import { Button, Modal } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Sidebar = (props) => {
    const [loading, setloading] = useState(false);

    let token = useSelector((state)=>state.user.token)
    // console.log(token)
 
    const [details, setdetails] = useState({
        title:"",
        description:"",
        files:''
    });
    // console.log(details)

    // modal part
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

 

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleInputChanger = (e)=>{
        setdetails({...details , [e.target.name]:e.target.value})
    }

  
    const handleFileChanger = async(e)=>{
        let files = e.target.files
        let filesArr = [...files]
        // console.log(filesArr)  
        setdetails({...details,files:filesArr})

    }
   
    
    const handleSubmit =async(e)=>{
 
        setloading(true)
        e.preventDefault()
        // console.log(details)
       
       let allCoudinaryUpload = details.files && details.files.map((ele)=>{
               let formData = new FormData();
          formData.append('file',ele)
          formData.append('upload_preset',process.env.REACT_APP_Upload_Preset)
             let res1 =  axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_Name}/upload`,formData)
      
          return res1
        })

        let ans = allCoudinaryUpload ? await Promise.all(allCoudinaryUpload) : [];
        // console.log(ans)


       let  FinalObj = {
        ...details,files:ans
       }
    //    console.log(FinalObj)
        
        let res =await axios.post('http://localhost:8080/posts/create',FinalObj,{
            headers:{
                'Authorization':token
            }
        })

        let data = res.data;
        console.log(data)
        if(data){
            setloading(false)
        }
        
        setdetails({
            title:"",
            image:"",
            video:"",
            description:""
        })
        props.getAllUSersPost()
        setIsModalOpen(false);
    }





  

    return (
        <div className='pt-4'>
            
            
            <Modal title="Basic Modal" open={isModalOpen}  okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
               {loading===false ?  <form action="" className='flex flex-col'>
                    <label className='my-2' htmlFor="">Title</label>
                    <input onChange={handleInputChanger} value={details.title} name="title" className='py-2 px-4 border border-amber-200' type="text" />
                    <label  className='my-2' htmlFor="">Description</label>
                    <textarea name = "description" value={details.description} onChange={handleInputChanger} className='py-2 px-4 border border-amber-200'  id=""></textarea>
                
                  <div className='flex gap-2 items-center'>
         
                    <label  htmlFor="files" className='bg-green-950 text-white py-2 px-4 rounded-md'>Image/ Video</label>
                    <input name="files" multiple onChange={handleFileChanger} className='py-2 px-4 border border-amber-200' type="file" id='files'  hidden/>
                  </div>
                
                 {details?.files && <div className='flex gap-1'>
                      {
                        details?.files?.map((file)=>{
                            return file.type.split('/')[0]==='image'?<img className='w-40 h-40' src={URL.createObjectURL(file)} alt="" />:<video className='w-40 h-40' src={URL.createObjectURL(file)}></video>
                        })
                      }
                  </div>}
                    <button onClick={handleSubmit} className='bg-green-950 text-white py-2 px-4 rounded-md my-2'>Submit</button>
                </form>
                
            :
            <h1>loading....</h1>
            }
            </Modal>
            <ul>
                <li><Button type="primary" onClick={showModal}>
                Create post
            </Button></li>
            </ul>
        </div>
    )
}

export default Sidebar
