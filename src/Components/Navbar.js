// Importing React Hooks
import React, { useState, useEffect, useRef } from 'react';

// Importing react-router-dom hooks
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Importing my hand-written functions which become useful in some cases (in order not to write the code again and again)
import { Capitalize, getFirstName } from "../UsefulFunctions"


const Navbar = (props) => {

const {showToast} = props;
  // States
  const [userName, setUserName] = useState("");
  const [feedback, setFeedback] = useState({email: "", title: "", message: ""});



// Use Ref
  const closeModal = useRef(null);


     
  // Using the useNavigate hoook to navigate through web pages
  const Navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
    showToast.success("Logged out Successfully")
  }

  // Using hte useLocation hook of react-router-dom to check the location of the page
  let location = useLocation();

  // Fetch data to say Welcome, {userName} to the user
 
  useEffect(() => {
    const fetchData = async () =>{
      const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        }
      })
      const json = await response.json();
      setUserName(Capitalize(getFirstName(json.name)))
    }

    // Fetch the Data
    fetchData();

   }, [])


// eslint-disable-next-line
  const onchange = (e) => {
    setFeedback({...feedback, [e.target.name]: e.target.value})
  }

// eslint-disable-next-line
  const sendFeedback = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/feedback/addfeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({email: feedback.email, title: feedback.title, message: feedback.message})
    });
   const json = await response.json();
   
   if(json.success) {
    // If feedback went successful then close the modal by using the "useRef" hook
    closeModal.current.click();

   }

  }
  return (
    <>
     
     <nav class=" w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
  <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
  <button
      class="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-1 px-1 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="bars"
        class="w-6"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
        ></path>
      </svg>
      </button>
    <div class="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
      <Link class="text-xl text-white pr-2 font-semibold" to="/">iNotebook</Link>
      <ul class="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
        <li class="nav-item p-2">

          {/* Link for Home */}

          <Link class="nav-link text-white" to="/">Home</Link>
        </li>

          {/* Link for About */}
        <li class="nav-item p-2">
          <Link class="nav-link text-white" to="/about">About</Link>


        </li>
        <li class="nav-item p-2">
          <Link class="nav-link text-white" to="/contactus">Contact Us</Link>
        </li>
      </ul>
      {/* if the user is not logged in then show this in the navbar */}
      {!localStorage.getItem("token") ?  <div className="flex flex-end">
    <Link to="/login" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-2">
      Login
    </Link>
    <Link to="/signup" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Signup
    </Link>
    </div> :
    // If the user is Logged in then Show this 
    <div class="flex justify-center">
    <div>
      <div class="dropdown relative">
        <button class=" dropdown-toggle px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Welcome, {userName}</button>
        <ul class=" dropdown-menu min-w-max hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
          aria-labelledby="dropdownMenuButton1">
          <li>
            <Link to="/contactus" class=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">Contact us</Link
            >
          </li>
          <li>
            <Link class=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" to="/myaccount">My Account</Link>
          </li>
          <li>
            <button class=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
    
    }



    </div>
    </div>

    
</nav>     
    
       

    {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky">
  <div className="container-fluid">
    <button className="navbar-brand" href="/">iNotebook</button>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem("token")?<form className="d-flex">
        
        <Link className={`btn btn-outline-danger mx-2 ${location.pathname === "/login" ? "disabled" : ""}`} to="/login">Login</Link>
        <Link className={`btn btn-outline-primary ${location.pathname === "/signup" ?"disabled" : ""}`} to="/signup">Signup</Link>
      </form>: 
      <div class="flex justify-center">
  <div>
    <div class="dropdown relative">
      <button
        class=" dropdown-toggle px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap mx-2
        "
        href="/"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Welcome, {userName}
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          ></path>
      </button>
      <ul
        class=" dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none
        "
        aria-labelledby="dropdownMenuButton2"
      >
        <li>
          <button class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="/">Feedback</button>
        </li>
        <li>
          <Link class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" to="/myaccount" >My Profile</Link>
        </li>
        <li>
          <button class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-trans ext-gray-700 hover:bg-gray-100" href="/" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
</div>}
</div>
</div>
</nav> */}

      

    </>
  )
}

export default Navbar
