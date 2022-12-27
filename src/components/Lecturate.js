import React from 'react'
import  { useContext } from 'react'
import ContextH from '../Contexthook/ContextH'
import lect from '../data/data'
import Lect from './Lect'
export default function Lecturate() {
    const context = useContext(ContextH)
    const {clickside} = context
  return (
    <div className='mt-2' style={{positon: "absolute"}}>
  
    <div className="flex justify-center flex-row flex-wrap gap-3">

    {lect.map((element)=>{
      return (
   

        <Lect title={element.title} image={element.imageUrl} description={element.description}/>
       
        )
      })}
      </div>
    
    
  </div>
  )
}
