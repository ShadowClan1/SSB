import React from 'react'
import {Puff} from 'react-loader-spinner'
const Spinner = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-4'>
    <div clasName='m-5'>
    <Puff
  height="80"
  width="80"
  radius={1}
  color="#00BFFF"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </div>
      
    </div>
  )
}

export default Spinner
