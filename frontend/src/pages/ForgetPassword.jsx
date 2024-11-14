import axios from 'axios'
import React, { useRef, useState } from 'react'

const ForgetPassword = () => {
    let inputRef = useRef()
    const [msg, setmsg] = useState('');

    const handleSubmit = async()=>{
        let obj ={
            email:inputRef.current.value
        }
        let res = await axios.post('http://localhost:8080/users/forget-password',obj);
        console.log(res.data)
        setmsg(res.data.msg)
    }
  return (
    <div>
        <h1 className='text-white w-max m-auto mb-6 text-2xl'>Password Request Page</h1>
      <div className=' mt-24 w-max m-auto '>
            <h1 className='text-green-500 text-4xl mb-4'>{msg}</h1>
            <input ref={inputRef} type="text" className='text-black outline-none px-4 py-2 rounded-md' placeholder='enter your email'/>
            <button onClick={handleSubmit} className='bg-green-950 text-white mx-3 hover:bg-green-700 px-4 py-2 rounded-md'>submit</button>
      </div>
    </div>
  )
}

export default ForgetPassword
