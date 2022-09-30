import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
  const {showToast} = props;
    const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
    const [ing, setIng] = useState("Create Account");


    



    // For Navigatng when the Signup is Successful
    const Navigate = useNavigate();


    useEffect(() => {
      if(localStorage.getItem("token")) {
        Navigate("/");
        showToast.success("Already Logged In");
      } 
    }, [])


    // A Function to run when account is being created
    const handleSubmit = async (e) => {
      setIng("Creating Account...")
      // To Prevent the page from reloading when the Form is submitted
        e.preventDefault();
        // Making a POST: Request to an Api to create a User on the Database
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        // Parsing the Json
        const json = await response.json();
        console.log(json);
        if(json.success) {
          localStorage.setItem("token", json.authToken);
          // console.log(json.success);
          // console.log(localStorage.getItem("token"));
          // showAlert("Account Created Successfully!", "success");
          setIng("Create Account");

          if(localStorage.getItem("token")) {
          showToast.success("Account Created Successfully!")
          
          // setTimeout(() => {
            
            Navigate("/");
            } else {
              // Navigate("/signup");
              showToast.error("There was an error creating your account, Try again", {duration: 5000})
            }
          // }, 1000);
            
        } else if (json.code === 400) {
          // showAlert("A User with this email already exists", "danger");
          showToast.error("A User with this email aready exist");
        } else if (json.code === 500) {
          showToast.error(json.error);
        } else if(json.code === 404) {
          showToast.error("Password must be atleast 10 characters")
        }
         else {
          showToast.error("Server Error");
        }
    }
    const onChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value});
    }

  return (
    <>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <div>
      
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a Account on iNotebook</h2>
      
      
    </div>
    <form onSubmit={handleSubmit} class="mt-8 space-y-6">
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Full Name</label>
          <input id="email-address" name="name" type="text" autocomplete="name" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Full Name" value={credentials.name} onChange={onChange}/>
        </div>
        <div>
          <label for="password" class="sr-only">Email</label>
          <input id="password" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email Address" value={credentials.email} onChange={onChange}/>
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" value={credentials.password} onChange={onChange} minLength={5}/>
        </div>
      </div>

     

      <div>
        <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">

             <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          {ing}
        </button>
      </div>
    </form>
  </div>
</div> 
   
</>
  )
}

export default Signup
