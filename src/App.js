// Style Sheet
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";


import Home from './Components/Home';
import Navbar from './Components/Navbar';
import NoteState from "./context/notes/NoteState";
import NotFound from './Components/NotFound';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
import MyAccount from './Components/MyAccount';
import Footer from './Components/Footer';
import SeparateNote from './Components/SeparateNote';
import LoadingBar from "react-top-loading-bar"
import toast, { Toaster } from 'react-hot-toast';
import ContactUs from './Components/ContactUs';
import Landing from './Components/Landing';


function App() {
  const [progress, setProgress] = useState(0);

  
  return (
    <>
    
   {/* The NoteState Component is in the top, So we can use functions like (getNote, fetchNote etc..) anywhere in the App by the Context Api */}
  
    <NoteState showToast={toast}>
      <BrowserRouter>
      <Navbar showToast={toast} />
      <LoadingBar
        height={3}
        color='red'
        progress={progress} 
      />
     <Toaster
  position="top-center"
  reverseOrder={false}
     />
 

      <div className="container">
          <Routes>
             <Route exact path="/" element={<Landing setProgress={setProgress}  showToast={toast} />} />
             <Route exact path="/home" element={<Home setProgress={setProgress}  showToast={toast} />} />
             <Route exact path="/login" element={<Login setProgress={setProgress}  showToast={toast}/>} />
             <Route exact path="/signup" element={<Signup setProgress={setProgress}  showToast={toast}/>} />
             <Route exact path="/myaccount" element={<MyAccount setProgress={setProgress} showToast={toast}/>} />
             <Route exact path="/note/:id" element={<SeparateNote setProgress={setProgress} />} />
             <Route exact path="/contactus" element={<ContactUs setProgress={setProgress} showToast={toast}/>} />
             <Route path="*" element={<NotFound />} />

          </Routes>
          <Footer />
          </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;