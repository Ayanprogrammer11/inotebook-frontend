import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom'

import noteContext from '../context/notes/noteContext';

import { useContext } from 'react';

import Loading from './Loading';



const SeparateNote = (props) => {
let location = useLocation();
// States
  const [loading, setLoading] = useState(true);

  // Props
  const {setProgress} = props;

  // Hooks
  const Navigate = useNavigate();
  const context = useContext(noteContext);
  const { id } = useParams();



  // Destructuring
  const {getNote, separateNote} = context;
  let {date, title, description, tag} = separateNote;


    useEffect(() => {
      // Set the Loading bar to 10 at first
      setProgress(10);
        if(!localStorage.getItem("token")) {
                Navigate("/login");
        } else {
          // Get the notes from the getNote function and pass "id" as a argument (This function is coming from a context named "noteContext" )
        getNote(id).then((data) => {
            // Once notes fetched then set the Loading bar to 100
            setProgress(100);
            // Set the skeleton loading to false
            setLoading(false);
        })
      
        
      //  return () => {
      //     title = "";
      //     description = "";
      //     tag = "";
      //  }
        }
        // eslint-disable-next-line
    }, [location.pathname])
  return (
    <>
    
    <div className="text-center text-4xl font-extrabold hover:transition-all hover:text-blue-500">
        Preview Note
    </div>
    
    {<Loading /> && loading === true ? <Loading /> : 
    <>
    <div className="date text-1xl text-center my-2">
    <h4>Created on: {date}</h4>
  </div>
  
  <div className="mx-20 note my-20">
      <div className="note title text-lg my-10"><span className='font-extrabold'>Title: <span className='font-medium hover:transition-all  text-blue-500 hover:text-blue-600'>{title}</span></span></div>
      <div className="note description text-lg my-10"><span className='font-extrabold'>Description: <span className='font-medium hover:transition-all  text-blue-500 hover:text-blue-600'>{description}</span></span></div>
      <div className="note tag text-lg my-10"><span className='font-extrabold'>Tag: <span className='font-medium hover:transition-all  text-blue-500 hover:text-blue-600'>{tag}</span></span></div>
  </div>
  </>
    }

    </>
    // <div>
    //   Title: {separateNote.title}
    //   description: {separateNote.description},
    //   tag: {separateNote.tag}
    // </div>

  )
}

export default SeparateNote
