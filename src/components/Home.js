import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ContextH from '../Contexthook/ContextH'
import lect from '../data/data'
import AboutIndia from './AboutIndia'
import CreateNote from './CreateNote'
import Lect from './Lect'
import Lecturate from './Lecturate'
import Posts from './Posts'
import Sidebar from './Sidebar'
import Signin from './Signin'
import Signup from './Signup'

import {TbLayoutSidebarLeftExpand } from 'react-icons/tb'
import { client, urlFor } from '../client/client'
import { MdCreate } from 'react-icons/md'
import Spinner from './Spinner'
export default function Home() {
 
  const [spinner, setSpinner] = useState(false)
  const navigate = useNavigate();
  const context = useContext(ContextH)
  const {auth, cards, setcards, aut, setalerts,getNotes, sideBar, setSideBar, findUser} = context;
const [search, setSearch] = useState("")
const searchQuery =`*[_type == 'post' && about match '${search}*'  || category match '${search}*'  || title  match '${search}*'  ]| order(_createdAt desc){
  image{
    asset->{
      url
    }
  },
  _id,
  title,
  about,
  postedBy->{
    _id, userName,
    profilePic, email
  },
  likes[]{
    _key, postedBy->{
_id, userName, image, email}
  },
  comments[]{
    postedBy->{
      _id, userName,
      profilePic, email
    },
    commentt
  }
}`

const onChange=(e)=>{
  setSearch(e.target.value);
  
}
useEffect(()=>{ if(search.length !== 0) { setSpinner(true); getSearchNotes(); setSpinner(false)}
else { setSpinner(true);getNotes();setSpinner(false)} },[search])
const getSearchNotes = async()=>{
  const data = await client.fetch(searchQuery)

  setcards(data)
}
const token = localStorage.getItem('user')
  useEffect(() => {
    findUser(token)
    
    
    if(!token ){setTimeout(()=>{setSpinner(true)},500);
      setalerts({alert : "danger", message: "Please Login or Sign Up"})
      setTimeout(()=>{
        setalerts({alerts: "", message: ""})
      },2000)
      navigate('/signin')
      setSpinner(false)
    }
    else{ setSpinner(true)
      if(search.length > 0){ getSearchNotes(); }
      else{getNotes();}
      setSpinner(false)
    }
  }, [])
 
  return (<>
  
  <div className='   h-screen  text-white hidden md:flex rounded-b-lg mr-4' >
  <Sidebar/> 
    </div> 


   { sideBar && <div className='mr-4  h-screen rounded-b-full  animate-slide-in animate-slide-fwd transition-height duration-75   ease-out text-white   md:hidden relative' >
  <Sidebar/> 
   </div>}{!sideBar && <button type='button' className='h-2 flex md:hidden' onClick={()=>{if(!sideBar)setSideBar(true);
  else{setSideBar(false)}}}  > <TbLayoutSidebarLeftExpand fontSize={30}/> </button>} 
  
   <div className='w-full'>
 
  
{/* {aut.name &&  `Welcome ${aut.name}`} */}
<Routes>


</Routes>
{/* {(cards.length >= 1) && cards.map((card)=>{ return (<Posts user={card.name} post={card.post} id={card._id} userId={card.userId} likes={card.likes} tempId ={aut.userId} likedBy={card.likedBy}/>)
})} */}
<div className='flex flex-row  items-center justify-between mt-5 mb-10 w-full flex-wrap'>
  <div className='flex flex-row justify-center w-4/5'>
    
<input type='text' className='flex rounded-full bg-gray-100 py-1 px-3 mr-2 ' value={search} onChange={onChange} placeholder='search'  />
  <button type='button' className='bg-black text-white px-2 rounded-full font-thin text-sm'>Search</button>
  </div>
  <Link to='/createnote' className='flex justify-end mr-4'> <MdCreate/> </Link>
</div>
{search.length > 1 && <p>search results for <strong> {search}</strong></p>}
{spinner? ( <div className='flex relative h-64 items-center w-full  mt-14 m-auto'>
<Spinner className='absolute '/> </div>
  ):(<div className='flex flex-row flex-wrap gap-2'>

{(cards.length > 0) ? cards.map((card)=>{ return (<Posts image={urlFor((card.image) && card.image)} key={card._id} postedBy={card.postedBy} user={card.title} post={card.about} id={card._id} userId={card.userName} likes={card.likes?.length}  tempId ={aut.userId} likedBy={card.likes} card={card}  comments={card.comments} />)
}) :(<div className=''> No post found </div>)}
</div>)}



   </div>
  </>

  )
}
