import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
  const {showToast} = props;
    const Navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [ing, setIng] = useState("Sign in");


    useEffect(() => {
      if(localStorage.getItem("token")) {
        Navigate("/");
        showToast.success("Already Logged In");
      } 
    }, [])
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      // setIng("Logging in....")
      
        const response = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            // Set the AuthToken to the Local Storage, So the user would not have to enter his/her credentials again and again when visiting the website
            localStorage.setItem("token", json.authtoken);
            console.log(localStorage.getItem("token"));
            console.log(json.success)
            // Navigate to the Root route of the application
            // showAlert("Logged in Successfully!", "success");
            showToast.success("Loggged in Successfully")
            setIng("Sign in");
            Navigate("/");
        }
            else if(json.code === 500) {
                // showAlert("Server Error", "danger");
                showToast.error("Server Error", {duration: 3000});
            } else if (json.code === 400) {
              showToast.error("Invalid Credentials");
            }
         else {
          setIng("Sign in");
          // showAlert("Invalid Credentials", "danger");
          showToast.error("Invalid Credentials", {duration: 2000});
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
      
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      
      
    </div>
    <form onSubmit={handleSubmit} class="mt-8 space-y-6">
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" value={credentials.email} onChange={onChange}/>
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" value={credentials.password} onChange={onChange} />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
        </div>

        <div class="text-sm">
          <a href="/" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
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

export default Login
