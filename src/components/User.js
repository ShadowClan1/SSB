import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client, urlFor } from '../client/client'
import Posts from './Posts'
const User = () => {
const [user, setUser] = useState([])
const token = localStorage.getItem('user')
const params = useParams()
const query = `*[_type == 'user' && _id == '${params.id}' ]{email,userName,details, phoneNumber, profilePic{asset->{url}, }, }`
const [cards, setCards] = useState([])
const userCards = `*[_type == 'post' && postedBy._ref== "${params.id}"  ]| order(_createdAt desc){
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
_id, userName, profilePic, email}
    },
    comments[]{
      postedBy->{
        _id, userName,
        profilePic, email
      },
      commentt
    }
  }`
const fetchCards =async ()=>{
    const data = await client.fetch(userCards);
    console.log(data)
    const data1 = await data.filter((card)=>{return card.postedBy._id == params.id })
    console.log(data1)
 setCards((data1))
}

const fetchUser= async ()=>{

 const data = await client.fetch(query)
 console.log(data)
setUser(user.concat(data))
}
    
    useEffect(()=>{fetchUser(); fetchCards();  console.log(cards)
console.log(user)},[])

  return (
    <div className='flex flex-col w-4/5 m-auto mt-4'>
        <div className='flex flex-row w-4/5  m-auto justify-between'>
            <div>
                <h1 className='text-2xl font-extrabold '>{user[0]?.userName}</h1>
                <p className='text-lg'> <strong>Details: </strong>{user[0]?.details}</p>
                <p > <strong>Phone number:</strong> {user[0]?.phoneNumber}</p>
                <p><strong>E-mail: </strong>{user[0]?.email}</p>
            </div>
            <div className='relative'>  <div className='h-32 w-32 outline-double
             rounded-full  outline-gray-500  relative flex ' >
             
                <img src={user[0]?.profilePic ? urlFor(user[0]?.profilePic): 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} className='rounded-full h-32 w-32 ' alt="Profile Picture" />
                
            </div>
            </div>
        </div> 
     <div className='font-extrabold text-lg '> User Posts:</div> 
     <div className='w-full flex flexc-row gap-2 flex-wrap'>
     {(cards.length >= 1) && cards.map((card)=>{ return (<Posts image={urlFor(card.image)} key={card._id} postedBy={card.postedBy} user={card.title} post={card.about} id={card._id} userId={card.userName} likes={card.likes?.length}  tempId ={token} likedBy={card.likes} card={card}  comments={card.comments} />)
})}
        </div> 
    </div>
  )
}

export default User
