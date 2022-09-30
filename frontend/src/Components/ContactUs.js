import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ContactUs = (props) => {
      const [email, setEmail] = useState("");
     const Navigate = useNavigate();
const {showToast} = props;

const handleSubmit = async (e) => {
    // const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/v1/contact/addcontact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({email, subject, message})
    });
    const json = await response.json();
    if(json.success) {
        showToast.success("Received:)")
    }
    Navigate("/");
}


    useEffect(() => {
        if(!localStorage.getItem("token")) {
            Navigate("/login")
        }
        const fetchUserEmail = async () => {
             const response = await fetch("http://localhost:5000/api/v1/auth/getuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
             });
             const json = await response.json();
             setEmail(json.email);
             console.log(json);

        }
        fetchUserEmail();
    }, [])



  return (
    <section class="bg-white dark:bg-gray-900">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
      <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Let us know.</p>
      <form class="space-y-8" onSubmit={handleSubmit}>
          <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" disabled value={email} />
          </div>
          <div>
              <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required minLength={5}/>
          </div>
          <div class="sm:col-span-2">
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." minLength={10}></textarea>
          </div>
          <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg sm:w-fit hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Send message</button>
      </form>
  </div>
</section>
  )
}

export default ContactUs
