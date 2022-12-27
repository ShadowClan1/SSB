import React, { useContext, useState } from 'react'
import ContextH from '../Contexthook/ContextH'
import {AiOutlineClose} from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
export default function Sidebar() {
    const context = useContext(ContextH);
    const {togsid , clickside, setSideBar, sideBar} = context
    const isNotActiveStyle = 'flex items-center px-2 gap-3 text-gray-500 hover:text-gray-100 transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-4 gap-3 font-extrabold border-r-2 border-black   transition-all duration-200 ease-in-out capitalize';
const categories = ['category1', 'category2', 'category3']
const [hideSideBar, setHideSideBar] = useState(false)
const handleClick = ()=>{if(!sideBar){setSideBar(true); setHideSideBar(false) }
else{ setHideSideBar(true) ;setTimeout(()=>setSideBar(false),600)}}
  return (
    
    <div className={`relative flex flex-col   rounded-r-xl h-full mt-1  min-w-210 w-full bg-black ${sideBar&&"sX"}  ${hideSideBar&&"xS"}`}  >
      <p className=' items-center   flex justify-center h-10'>

      side bar
      </p>
{sideBar && <div className={` md:hidden absolute top-0 right-0 sX ${hideSideBar && 'xS'}`}>


      <button onClick={handleClick} ><AiOutlineClose fontSize={25} /></button>

  </div>}
<div className='flex justify-items-center justify-center  flex-col gap-5 pt-2 '>
<NavLink end className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} to='/'>Home </NavLink>
{categories.map((item)=>{return (<NavLink className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} key={item} to={`/categories/${item}`}>
{item}
</NavLink>)})}
</div>
    </div>

  )
}
