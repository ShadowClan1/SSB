import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client/client";
import ContextH from "../Contexthook/ContextH";

export default function Signup() {
  const Host = "http://localhost:4000/signup";
const [hover, setHover] = useState(false)
  const context = useContext(ContextH)
  const {setalerts} = context
  const [text, settext] = useState({name: "", email: "", password: "", cpassword : "" });
  const navigate = useNavigate()
  const [move, setmove] = useState("0px")
  const togglemove = ()=>{
    setHover(true)
  }
  const onChange = (e) => {
    settext({ ...text, [e.target.name]: e.target.value });
    
  };
  
  const handleClick = async(name, email, password, image, details, phoneNumber)=>{
const checkUser = `*[_type == 'user' && email == '${email}']{
  email
}`
const cU = await client.fetch(checkUser)
    if(cU.length > 0){
     setalerts({ alert: "danger", message: "userAlready exists" }); return setTimeout(()=>{setalerts({ alert: "", message: "" })}, 2000)
     
    }
else{

{const user = {

email : email,
_type : 'user',
userName : name,
profilePic : image,
password : password,
details : details,
phoneNumber: phoneNumber



}



   client.create(user).then((data)=>{console.log(data); 
    setalerts({ alert: "success", message: "Account created" });  setTimeout(()=>{setalerts({ alert: "", message: "" })}, 2000) ; return navigate('/signin')})

}}

  }
  const handleClicky = (e) => {
    e.preventDefault();
  };
  const [passtype, setpasstype] = useState("password")
  const toggle = ()=>{
if(passtype == 'password'){
  setpasstype("text")
}
else if(passtype == "text"){ setpasstype("password")
}
  }

  return (
    <div className="container">
      <form onSubmit={handleClicky}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
           
            className="form-control"
            
            onChange={onChange}
            name="name"
            
          />
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
            value={text.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
           Confirm Password {text.password !== text.cpassword &&  <span className={`text-muted ${text.password !== text.cpassword  ? "": "d-none"} `}>Passwords didn't match </span>}
           {text.password.length < 5 && <span className="text-muted">Min 8 characters</span> }
          </label>
          <input
            type={passtype} 
            value={text.cpassword}
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChange}
            name="cpassword"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1" 
            onClick={toggle}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out to show password   
          </label>
        </div> 
        <div className={`w-full h-10 flex relative ${ ( !text.email.includes("@")  || text.password !== text.cpassword || text.password.length < 8) ? ' hover:justify-end  ' : " justify-start "}`}>
        <button   onmouseenter={ text.password.length< 8  && togglemove}  disabled={ !text.email.includes("@") ||  text.name.length < 3 || text.email.length < 4 ||text.password !== text.cpassword || text.password.length < 8 }
          className={ ` h-8 px-2 py-1  absolute  animationFillModeForwards ${ !text.email.includes("@") || (text.password !== text.cpassword || text.password.length < 8) ? ' hover:animate-signupMove bg-red-500 hover:bg-red-400 ' : "bg-blue-500 hover:bg-blue-400"}   p-1 rounded-xl text-white  `}
          onClick={()=>{handleClick(text.name,text.email.toLowerCase(), text.password)}}
        >
          Submit
        </button></div>
      </form>
    </div>
  );
}
