import React, { useState } from 'react'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

export default function Lect(props) {
  const [showFull, setShowFull] = useState(false)
 
  const handleClick = ()=>{
if(!showFull)setShowFull(true);
else setShowFull(false);

  }
    const {description } = props;
    const string = description.toString()
  return (
    
      <div className={` px-1 hover:shadow-lg mb-3  flex flex-col mx-3 ${showFull? " justif-center z-10 block w-370": "w-64"}`}    >
  <img src={props.image}   className="m  rounded-lg"  alt="..."/>
  <div className="card-body flex flex-col" >
    <h5 className="text-lg" >{props.title}</h5>
    <p className="text-sm" >{showFull ? description:description.slice(0,50) +"..."}</p>
    <div className='d-flex justify-content-start'>

    <button onClick={handleClick} className="btn btn-primary mt-2 text-xs" >Read {!showFull?( <>more <MdArrowDownward className='inline'/></> ) :(<>less<MdArrowUpward className='inline'/></>)} </button>
    </div>
  </div>
</div>

 

  )
}
