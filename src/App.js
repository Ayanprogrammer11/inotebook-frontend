// Style Sheet
import './App.css';

// Importing Routing from "react-router-dom"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useRef } from 'react';
// importing Components to render in the App
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import NoteState from "./context/notes/NoteState";
import NotFound from './Components/NotFound';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
import Alert from './Components/Alert';
import MyAccount from './Components/MyAccount';
// import Toast from './Components/Toast';
import Footer from './Components/Footer';
import SeparateNote from './Components/SeparateNote';
import LoadingBar from "react-top-loading-bar"
import toast, { Toaster } from 'react-hot-toast';
import ContactUs from './Components/ContactUs';


function App() {
  // const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0);
  const closeToast = useRef();
  // const showAlert = (message, type) => {
  //     setAlert({
  //       msg: message,
  //       type: type
  //     });
  //     setTimeout(() => {
  //       setAlert(null);
  //     }, 2000)
  // }
  // const sayFeedback = setTimeout(() => {

  //   toast.custom((t) => (
  //     <div
  //       className={`${
  //         t.visible ? 'animate-enter' : 'animate-leave'
  //       } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  //     >
  //       <div className="flex-1 w-0 p-4">
  //         <div className="flex items-start">
  //           <div className="flex-shrink-0 pt-0.5">
  //           </div>
  //           <div className="ml-3 flex-1">
  //             <p className="text-sm font-medium text-blue-500">
  //               iNotebook
  //             </p>
  //             <p className="mt-1 text-sm text-gray-500">
  //               Tell us how we can improve Our Application
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex border-l border-gray-200">
  //         <button ref={closeToast}
  //           onClick={() => toast.dismiss(t.id)}
  //           className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //         >
  //           Close
  //         </button>
  //         <button
          
  //           onClick={<About />}
  //           className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //         >
  //           Give Feedback
  //         </button>
  //       </div>
  //     </div>
  //   ))


  // }, 60000)


  // setTimeout(() => {
  //   // 
  //   closeToast.current.click();
  // }, 60000)
// Change Position
  
  return (
    <>
    
   {/* The NoteState Component is in the top, So we can use functions like (getNote, fetchNote etc..) anywhere in the App by the Context Api */}
  
    <NoteState showToast={toast}>
      <BrowserRouter>
      <Navbar showToast={toast}/>
      <LoadingBar
        height={3}
        color='red'
        progress={progress} 
      />
     <Toaster
  position="top-center"
  reverseOrder={false}
     />
      {/* <Alert alert={alert} /> */}

      <div className="container">
          {/* {sayFeedback} */}
          <Routes>

             <Route exact path="/" element={<Home setProgress={setProgress}  showToast={toast} />} />
             <Route exact path="/about" element={<About setProgress={setProgress} />} />
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