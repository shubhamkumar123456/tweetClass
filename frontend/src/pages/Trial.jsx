import React from 'react'
import { useSelector } from 'react-redux'

const Trial = () => {
    const store = useSelector((state)=>state.user);
    console.log(store)

  return (
    <div>
      This is trial page
    </div>
  )
}

export default Trial
