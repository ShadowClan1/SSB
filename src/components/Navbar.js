import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { GoSignIn } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { CgOptions } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContextH from "../Contexthook/ContextH";
import { MdPower, MdPowerOff } from "react-icons/md";
import { urlFor } from "../client/client";

export default function Navbar() {
  const context = useContext(ContextH);
  const { sideBar, setSideBar, user, anonymus } = context;
  const location = useLocation();
  const l = location.pathname;
  
  const token = localStorage.getItem("user");
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const [closeNav, setCloseNav] = useState(false);
  const handleClick = () => {
    if (!showNav) {
      setShowNav(true);
      setCloseNav(false);
    } else {
      setCloseNav(true);
      setTimeout(() => setShowNav(false), 600);
    }
  };

  const back = () => {
    const lst = l.lastIndexOf("/");
    navigate(`${l.slice(0, lst)}`);
  };
  return (
    <div>
      {/* laptops */}
      <div className="w-screen text-white md:flex hidden rounded-b-md  bg-black relative">
        {" "}
        <ul className="navbar-nav  w-4/5 justify-center  flex-row gap-2   me-auto mb-2 mb-lg-0 z-50 items-center ">
          {l != "/" && (
            <div className="absolute left-0  " type="button" onClick={back}>
              {" "}
              <IoIosArrowBack fontSize={32} className="text-white" />{" "}
            </div>
          )}
          <li className="nav-item   ">
            <Link to="/">jsk </Link>
          </li>
          <li className="nav-item  hover:bg-gray-900 px-3  my-2 py-1  rounded-md">
            <Link
              className={`nav-link ${l === "/" ? "active" : ""}`}
              to={`${token && "/"}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item  hover:bg-gray-900 px-3  my-2 py-1  rounded-md">
            <Link
              className={`nav-link ${l === "/aboutindia" ? "active" : ""}`}
              to="/aboutindia"
            >
              About India
            </Link>
          </li>
          <li className="nav-item hover:bg-gray-900 px-3  my-2 py-1  rounded-md">
            <Link
              className={`nav-link ${l === "/lecturate" ? "active" : ""}`}
              to="/lecturate"
            >
              Lecturate
            </Link>
          </li>
          <li className="nav-item hover:bg-gray-900 px-3  my-2 py-1  rounded-md dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Options
            </Link>
            <ul className="dropdown-menu">
              {!token ? (
                <>
                  {" "}
                  <li>
                    <Link className="dropdown-item" to="/signin">
                      <GoSignIn className="inline" /> signin
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (<li onClick={()=>{
                localStorage.clear();
                navigate('/signin')
              }}> <Link className="dropdown-item" > <AiOutlinePoweroff className="inline mr-2"/>
              LogOut
            </Link></li>)}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Something else here
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item hover:bg-gray-900 px-3  my-2 py-1  rounded-md ">
            <Link className={`nav-link ${l === "/Disabled" ? "active" : ""}`}>
              Disabled
            </Link>
          </li>
        </ul>{" "}
        <div className=" w-1/5  justify-center items-center flex  ">
          {" "}
          {token && (
            <button
              className=" hover:bg-gray-800 px-3 py-2
         rounded-lg
        
        
        
        
        
        "
              onClick={() => {
                localStorage.clear();

                navigate("/signin");
              }}
            >
              <AiOutlinePoweroff className="inline" /> Sign out
            </button>
          )}
          {!token && (
            <button
              className=" hover:bg-gray-800 px-3 py-2
         rounded-lg"
              onClick={() => {
                navigate("/signin");
              }}
            >
              <GoSignIn />
            </button>
          )}
        </div>
      </div>

      {/* show navBar in phones */}

      <div
        className={`w-full h-12 relative text-white bg-black ${
          !showNav && "rounded-b-sm"
        } flex md:hidden justify-between   animate-slide-in flex-row z-10`}
      > 
      <div className="ml-3 flex text-center items-center"> <img src={user[0].profilePic ? urlFor(user[0].profilePic) : anonymus} className='h-5 w-5 mr-3 rounded-full' /><span className="text-sm " >
        { user[0]?.userName}</span> </div>
        <button
          type="button"
          onClick={handleClick}
          className={`mr-5 ${showNav && "spin90"}   `}
        >
          <CgOptions fontSize={25} />{" "}
        </button>{" "}
      </div>
      {showNav ? (
        <div
          className={`w-screen ${showNav && "sY"} ${
            closeNav && "yS"
          }  bg-black  md:hidden flex flex-col text-white`}
        >
          <ul
            onClick={handleClick}
            className=" ml-1 navbar-nav w-full items-end   me-auto mb-2 "
          >
            <li className="nav-item mr-10  hover:bg-gray-900 px-3 py-1 rounded-md">
              <Link
                className={`nav-link ${l === "/" ? "active" : ""}`}
                to={`${token && "/"}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item mr-10 hover:bg-gray-900 px-3 py-1 rounded-md">
              <Link
                className={`nav-link ${l === "/aboutindia" ? "active" : ""}`}
                to="/aboutindia"
              >
                About India
              </Link>
            </li>
            <li className="nav-item mr-10 hover:bg-gray-900 px-3 py-1 rounded-md">
              <Link
                className={`nav-link ${l === "/lecturate" ? "active" : ""}`}
                to="/lecturate"
              >
                Lecturate
              </Link>
            </li>
            <li className="nav-item mr-10 hover:bg-gray-900 px-3 py-1 rounded-md dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Options
              </Link>
              <ul className="dropdown-menu">
                {!token ?(
                  <>
                    {" "}
                    <li>
                      <Link className="dropdown-item" to="/signin">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signup">
                        Sign Up
                      </Link>
                    </li>{" "}
                  </>
                ) : (<li onClick={()=>{
                  localStorage.clear();
                  navigate('/signin')
                }}> <Link className="dropdown-item" > <AiOutlinePoweroff className="inline mr-2"/>
                LogOut
              </Link></li>)}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item mr-10  hover:bg-gray-900 px-3 py-1 rounded-md">
              <Link className={`nav-link ${l === "/Disabled" ? "active" : ""}`}>
                Disabled
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
