import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import ContextH from "./ContextH";
import {client, urlFor} from '../client/client'


const ContextI = (props)=>{
    //Home 
const [showMoreComments, setShowMoreComments] = useState(false)
const [user, setUser] = useState([])
    const [sideBar, setSideBar] = useState(false)

    const host1 = 'http://localhost:4000/f'
    const nI = []
    const [cards, setcards] = useState(nI)
   
    const [aut, setaut] = useState({name: ""})
    const hosta = 'http://localhost:4000/auth'
    
    const token = localStorage.getItem("user")
    const auth = async ()=>{
      // const response = await fetch(hosta, {
      //   method: "GET",
      //   headers: {
      //     authToken : token 
      //   }
      // })
      // const json = await response.json();
      // console.log(json)
      // setaut(json)
    }
//     const getNotes= async()=>{
//       const res = await fetch(host1, {
//         method: "GET"
//       })
      
//       const json = await res.json()
      
//     const newarr = [];

      
// for(let i = 0 ; i<json.posts.length ; i++){
//     newarr[i] = await json.posts[json.posts.length - i - 1]
// }
// console.log('cards from fetch cards')
// console.log(newarr)
// setcards(newarr)
//     //   setcards(cards.concat(newarr)) 
//     //   console.log(newarr)
//     }

const anonymus = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
const [comments, setComments] = useState([])
const findUser = (id)=>{

client.fetch(`*[_type == "user" && _id == "${id}"]{
  userName, profilePic {
    asset->{url}
  }
}`).then((data)=>{
  console.log(data)
  setUser(data);
})


}

const getNotes = async ()=>{
 if(token){ const queryAllNotes = `*[_type == 'post']| order(_createdAt desc){
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

const data = await client.fetch(queryAllNotes) 
setcards(data)

}
}







//create a note
const hostc = "http://localhost:4000/c";

const [post, setpost] = useState({ post: "" });
const onChangecn = (e) => {
  setpost({ ...post, [e.target.name]: e.target.value });
};
const handleClick = async (post) => {
  const token = localStorage.getItem("token");
  if (!token) {
    setalerts({ alert: "danger", message: "uploading failed" });
  } else {
    

    const response = await fetch(hostc, {
      method: "POST",
      headers: {
        authToken: token, "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: post.post }),
    });
    const json = await response.json();

    // console.log("cards from create note")
    // console.log(cards)
    console.log("new arr")
    const n = cards.concat(json.note)
const na = [];
for(let i= 0; i< n.length ; i++){
 na[0] = n[n.length - 1]
  na[i+1] = n[i]
}

console.log(na)


    setcards(na)
    setpost({post: ""})
    
  }
};

//Like
const [like, setlike] = useState(0)
const handleLike = async(id)=>{
  const token = localStorage.getItem("token")
const response = await fetch("http://localhost:4000/l", 
{method: "PUT" , headers:{
  "authToken" : token,
  "Content-Type": "application/json"
},
body: JSON.stringify({id : id})})

const json = await response.json()
console.log(json)


}







//delete note
    
  const host = 'http://localhost:4000/delete';
  const del = async (id)=>{
    const token = localStorage.getItem('token');
    if(!token){
      console.log("token not found")
    }
    else {
      const response = await fetch(host, {
        method: "DELETE",
        headers : {
          "authToken" : token,
          "Content-Type": "application/json"
        }
        , body : JSON.stringify({id : id})
      })
    
      const arr = cards.filter((post)=>{
        return post._id !== id
      })
setcards(arr)

    }}
    const [togsid, settogsid] = useState({dis : "none", z : 99})
    const clickside = ()=>{
     if(togsid.dis=="none") { settogsid({dis: 'block', z: 0})}
     else{settogsid({dis : "none", z : 99})}
    }
   const [alerts, setalerts] = useState({alert: '' , message: ''})
    
    return(
<ContextH.Provider value={{togsid, settogsid, clickside, alerts, setalerts, del,auth, cards, aut, token,getNotes, onChangecn, post ,handleClick, handleLike, sideBar, setSideBar, showMoreComments, setShowMoreComments, setcards , findUser, user, anonymus} }>

{props.children}

</ContextH.Provider>



    )
}
export default ContextI;