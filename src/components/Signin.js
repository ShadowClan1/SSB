import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { client } from "../client/client";
import ContextH from "../Contexthook/ContextH";

export default function Signin() {
  const [hovered, setHovered] = useState(false)
  const token = localStorage.getItem('user')
  const context = useContext(ContextH);
  const {alerts, setalerts} = context;
  const [passtype, setpasstype] = useState("password")
  const toggle = ()=>{
if(passtype == 'password'){
  setpasstype("text")
}
else if(passtype == "text"){ setpasstype("password")
}
  }
  const Host = "http://localhost:4000/signin";
  const [text, settext] = useState({ email: "", password: "" });
  const onChange = (e) => {
    settext({ ...text, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();


  const handleClick = async (email, password)=>{
  const querry = `*[_type== "user" && email == "${email}" && password == "${password}"]{
    userName, email, password, profilePic{
      asset->{
        url
      }
    }, _id,
    details, phoneNumber 
  }`
    const data = await client.fetch(querry)
    console.log(data)
if(data.length > 0 ){
  setalerts({ alert: "success", message: "Login successful" });  setTimeout(()=>{setalerts({ alert: "", message: "" })}, 2000);
  console.log(data)
  localStorage.setItem('user', data[0]._id);

  navigate('/')
}
else{
  setalerts({ alert: "danger", message: "Login failed" });  setTimeout(()=>{setalerts({ alert: "", message: "" })}, 2000)

}
  }
  const handleClicky = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form onSubmit={handleClicky}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type={passtype}
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChange}
            name="password"
          />
        </div>
        <div className=" form-check mitems-center ">
          <input
            type="checkbox"
            className="form-check-input mt-2"
            id="exampleCheck1" onClick={toggle}
          />
          <label className="form-check-label  flex justify-between" htmlFor="exampleCheck1">
            Check me out to show password  <button  className='text-blue-500 px-3 py-2
         rounded-lg' onClick={()=>{
      
        navigate('/signup')
      }}>Sign up...</button> 
          </label>
        </div>
        <button onMouseEnter={()=>setHovered(true)}
        disabled={text.email.length < 4 || !text.email.includes("@")}
          className={`h-8 py-2 px-3  items-center flex text-white rounded-lg ${text.email.length < 4 || !text.email.includes("@") || text.password.length < 3 ? "bg-red-500 " :"bg-blue-500"} `}
          onClick={()=>{handleClick(text.email.toLowerCase(), text.password)}}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
