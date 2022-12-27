import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillDelete, AiFillLike } from 'react-icons/ai';
import { CgOpenCollective } from 'react-icons/cg';
import { useParams } from 'react-router-dom'
import { client, urlFor } from '../client/client';
import { Link } from 'react-router-dom';
import {v4 as uuid} from 'uuid'
import { Oval, Rings, ThreeCircles } from 'react-loader-spinner';

const PostDetails = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])
  const token =  localStorage.getItem('user')
  const addComment = ()=>{
    setLoading(true)
     client.patch(parmas.id).setIfMissing({comments : []}).insert('after', "comments[-1]" , [{
   _key : uuid(),
      commentt : commentt
      ,
      postedBy :{
_type: 'postedBy', 
_ref:token
      }
    }]).commit().then((data)=>{
      
     setPost([{ _id: post[0]._id , image : post[0].image, likes: post[0].likes , postedBy:  post[0].postedBy  , title: post[0].title, _id: post[0]._id , comments : user.length > 0 && post[0]?.comments?.concat({_key: uuid(), commentt : commentt, postedBy:{profilePic : user.length > 0 ? user[0]?.profilePic : "" , userName : user.length > 0 &&  user[0]?.userName }})}])
     
setCommentt("");
setLoading(false)
    })
  }
  const onChange = (e)=>{
setCommentt(e.target.value)
  }

 useEffect(()=>{
client.fetch(`*[_type == 'user' && _id == '${token}']{
  userName, profilePic {
    asset->{url}
  }
}`).then((data)=>{
  setUser(user.concat(data));
  console.log(data)
})

setTimeout(()=>{console.log(user.length > 0 ?  user[0]?.userName : "hare ") }, 5000)
 }, [])

  const [commentt, setCommentt] = useState("")
  const [post, setPost] = useState([]);
    const parmas = useParams();
    const getPost = async ()=>{
      const query = `*[ _type == 'post' && _id == "${parmas.id}"]{
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
        comments[]{_key,
          postedBy->{
            _id, userName,
            profilePic, email
          },
          commentt
        }
      }`

      const data = await client.fetch(query)
      console.log(data)
       setPost(post.concat(data))
    }

    // const {about, image, comments, likes, postedBy, title, _id} = post[0] ;
    
  
    useEffect(() => {
      getPost();
      console.log(post);
  
    }, [])
    
    const deleteCom =  (id)=>{
      //backend
      const newww = post[0]?.comments.filter((items)=> items._key == id );
client.patch(parmas.id).unset([`comments[${post[0]?.comments?.indexOf(newww)}]`]).commit().then((data)=>{
  console.log(data)
})
//client
console.log(post[0])
setPost([{likes: post[0]?.likes, postedBy : post[0]?.postedBy, _id : post[0]?._id, image: post[0]?.image, title: post[0]?.title  , comments: post[0]?.comments.filter((items)=> items._key != id ) }])    


    }
    
  return (<div className='my-9 mx-4 w-screen h-full'>
    <div className='  flex flex-col md:hidden justify-center items-center w-full bg-gray-300 rounded-lg '> 
    <div className='flex flex-col p-3' > <img src={post[0] && (urlFor(post[0]?.image ? post[0]?.image : ""))} alt="" className='rounded-lg  z-10' />  <div className='bg-white rounded-lg mt-3 p-0 items-center justify-start gap-2 text-center flex flex-row'>
        <AiFillLike/>{post[0]?.likes?.length} <div className='flex flex-row relative py-1'>{post[0]?.likes?.slice(0,3).map((item)=>{
        return (
       <div key={item._key} className='absolut '><img src={item.postedBy.profilePic ? urlFor(item.postedBy.profilePic): "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} className='w-6 h-6 rounded-full'/> </div>
        )
       })} </div>
       </div>
        <div className='w-full bg-white my-2 ml-1 rounded-lg flex flex-col'>
        { post[0]?.comments?.map((items, index)=>{ return (<div key={index} className='bg-gray-300 relative rounded-lg my-1 px-1 items-center justify-start py-1 text-start flex mx-1  flex-row'>  <div className='mr-5 flex flex-col items-start justify-start text-start h-full'><Link to={`/user/${items.postedBy._id}`}> <div><img src={ items?.postedBy.profilePic ? urlFor(items?.postedBy?.profilePic) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} className='w-10 h-10 rounded-full'/></div> <p className=' w-12 text-xs'> {items.postedBy.userName}</p>
      </Link> </div> <div className='flex flex-col justify-start'> {items?.commentt}</div> <div className='absolute right-2' onClick={()=>deleteCom(items._key)}> <AiFillDelete/> </div> </div>)})}</div>
       <div className='flex flex-row justify-between'>
        
        <input type="text" className='p-1 rounded-lg focus:outline-none w-full mr-1 ml-1 ' placeholder='Comment...' value={commentt} onChange={onChange} />
        <button type='button ' className='mr-1  rounded-lg bg-blue-600 px-2 py-1 text-white hover:bg-blue-500' onClick={addComment}>{loading? <ThreeCircles height={20} width={20} color='white' /> : "Post"}</button>
        </div>
    
      </div>
    











      {/* medium devices like laptops */}
    </div> <div className='flex flex-col'>

    <div className='  hidden flex-col  md:flex'>  
    <div className='flex flex-row gap-2 justify-center items-center w-full bg-gray-300 h-600  p-4 rounded-lg'>

    <div className='flex flex-col w-5/6' > <img src={post[0] && (urlFor(post[0]?.image ? post[0]?.image : ""))} alt="" className='rounded-lg hover:shadow-lg z-10' />  <div className='bg-white rounded-lg mt-1 p-0 items-center  justify-center text-center flex flex-row'>{post[0]?.about}
        </div><div className='bg-white rounded-lg mt-1 p-0 items-center justify-start text-center flex flex-row'>
        <AiFillLike className='mr-4 ml-1'/> {post[0]?.likes?.length}
       <div className='flex flex-row relative py-1'>{post[0]?.likes?.slice(0,3).map((item)=>{
        return (
       <div key={item._key} className='absolut '><img src={item.postedBy.profilePic ? urlFor(item.postedBy.profilePic): "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} className='w-6 h-6 rounded-full'/> </div>
        )
       })} </div></div> </div>
    <div className=' w-1/2 bg-white h-72 overflow-y-scroll scrollBar  ml-4 rounded-lg flex flex-col relative' style={{}}>
       { post[0]?.comments?.map((items, index)=>{ return (<div key={index} className='bg-gray-300 rounded-lg my-1 px-1 items-center justify-start py-1 text-center flex mx-1  flex-row'>  <div className='mr-5 flex flex-col items-start justify-start h-full'><Link to={`/user/${items.postedBy._id}`}> <div><img src={ items?.postedBy.profilePic ? urlFor(items?.postedBy?.profilePic) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} className='w-10 h-10 rounded-full'/></div> <p className=' text-xs'> {items.postedBy.userName}</p>
       <p className=' text-xs'> {items?.postedBy.name} </p></Link> </div> <div className='mb-4'> {items?. commentt} </div> <div className='absolute right-2  z-10 rounded-lg  hover:bg-gray-200 ' onClick={()=>{deleteCom(items._key)}} ><AiFillDelete className=''/></div></div>)})}
       
    </div>
    
      {/* <button onClick={handleClick}>dfa</button> */}
    </div> 
    
    <div className='bg-gray-300 p-2 rounded-lg mt-1 flex-col flex'>  
    <div className='flex flex-row justify-between'>
        
    <input type="text" className='p-1 rounded-lg focus:outline-none w-full mr-1' placeholder='Comment...' value={commentt} onChange={onChange}  />
    <button type='button ' className='mr-1 rounded-lg bg-blue-600 px-2 py-1 text-white hover:bg-blue-500' onClick={addComment}>{loading? <ThreeCircles height={20} width={20} color='white' /> : "Post"}</button>
    </div></div>
 
 </div>

    </div>
  </div>
  )
}

export default PostDetails
