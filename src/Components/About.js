import React, { useEffect } from 'react'
// import Axios from 'axios';
// import { useState } from 'react'
// import noteContext from '../context/notes/noteContext'
// import { Capitalize, Truncate } from "../UsefulFunctions"
import { useNavigate } from 'react-router-dom';
const About = (props) => {
  const {setProgress} = props;
  const Navigate = useNavigate();
  useEffect(() => {
    // setProgress(50);
    if(!localStorage.getItem("token")) {
      Navigate("/login");
      }
      setProgress(100);
  }, [])
 
  return (
    <>
    <div className='text-center h2'>About iNotebook</div>
    <div className="content my-4">
      <p>iNotebook is an Application Where you can save your Notes, <strong className='text-primary'>For Example</strong>: If you </p>
    </div>
    </>
  )
}


export default About
