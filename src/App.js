
import { useContext } from 'react';
import { MdCreate } from 'react-icons/md';
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutIndia from './components/AboutIndia';
import Alerts from './components/Alerts';
import CreateNote from './components/CreateNote';
import Home from './components/Home';
import Lecturate from './components/Lecturate';
import Navbar from './components/Navbar';
import PostDetails from './components/PostDetails';
import Sidebar from './components/Sidebar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import User from './components/User';
import ContextH from './Contexthook/ContextH';
import ContextI from './Contexthook/ContextI';

function App() {
  
  return (
    <Router>

    < >
      <ContextI>
    <Navbar />
    <Alerts/>
    
    <div style={{height:'100%'}} className='flex flex-row '>

    
   
    <Routes>
  <Route element={<Lecturate/>} path='/lecturate'/>


  <Route element={<Signup/>} path='/signup'/>


  <Route element={<Signin/>} path='/signin'/>


  <Route element={<AboutIndia/>} path='/aboutindia'/>

   
  <Route path='/createnote' element={<CreateNote/>}/>
<Route path='/user/:id' element={<User/>}/>

  <Route element={<Home/>} end path='/*'/>
  <Route element={<PostDetails/>} end path='/post/:id'/>
</Routes>

      </div>
      </ContextI>
    </>
    </Router>
  );
}

export default App;
