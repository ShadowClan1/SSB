import React from 'react'
import { CgHeart } from 'react-icons/cg'
import { IoMdJet } from 'react-icons/io'
import { MdTwoWheeler, MdWheelchairPickup } from 'react-icons/md'
import { Hearts } from 'react-loader-spinner'

export default function AboutIndia() {
  return (
    <div className='w-screen h-screen '>
      <div className='w-full justify-start items-center flex flex-col h-full gap-3 placeholder:shadow-sm '>
        <div className='flex flex-row justify-between w-4/5'><div className='flex flex-col'> <div className='text-4xl font-extrabold flex flex-row items-center'> <MdTwoWheeler color='orange' className='text-orange-100 inline sX'/>INDIA  <IoMdJet className='text-green-700 inline sY' /> </div> </div>
        <div><img src='https://o.remove.bg/downloads/3ab1840f-a1c8-4aec-ad8b-7de6bcd062f8/985e693938c5f3090988770817a8b4ed-removebg-preview.png' className='w-3/5  float-right sY'/></div>
        </div>
        <div>column2</div>
        
      </div>
    </div>
  )
}
