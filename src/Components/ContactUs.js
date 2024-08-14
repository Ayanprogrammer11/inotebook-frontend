import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
const host = "https://screeching-kitti-ayanliaqat-8e939237.koyeb.app";
const ContactUs = (props) => {
      const [email, setEmail] = useState("");
      const [loading, setLoading] = useState({fetching: true, submit: false});
     const Navigate = useNavigate();
const {showToast, setProgress} = props;

const handleSubmit = async (e) => {
    setLoading({
        submit: true
    });
    // const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    e.preventDefault();
    const response = await fetch(`${host}/api/v1/contact/addcontact`, {
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
    Navigate("/home");
    setLoading({
        submit: false
    });
}


    useEffect(() => {
        
        if(!localStorage.getItem("token")) {
            Navigate("/login")
        }
        const fetchUserEmail = async () => {
             const response = await fetch(`${host}/api/v1/auth/getuser`, {
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
        setProgress(10);
        fetchUserEmail().then(() => {
            setProgress(100);
            setLoading({
                fetching: false
            });
        });
    }, [Navigate, setProgress])



  return (
    <>
    {<Loading /> && loading.fetching === true ? <Loading /> : 
    <section class="bg-white">
    <div class="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
        <h2 class="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900">Contact Us</h2>
        <p class="mb-8 text-center font-light text-gray-500 sm:text-xl lg:mb-16">Got a technical issue? Want to send feedback about a beta feature? Let us know.</p>
        <form class="space-y-8" onSubmit={handleSubmit}>
            <div>
                <label for="email" class="mb-2 block text-sm font-medium text-gray-900">Your email</label>
                <input type="email" id="email" class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm" placeholder="name@flowbite.com" disabled value={email} />
            </div>
            <div>
                <label for="subject" class="mb-2 block text-sm font-medium text-gray-900">Subject</label>
                <input type="text" id="subject" class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm" placeholder="Let us know how we can help you" required minLength={5}/>
            </div>
            <div class="sm:col-span-2">
                <label for="message" class="mb-2 block text-sm font-medium text-gray-900">Your message</label>
                <textarea id="message" rows="6" class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm" placeholder="Leave a comment..." minLength={10}></textarea>
            </div>
            <button type="submit" class="rounded-lg bg-blue-800 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-fit" disabled={loading.submit}>Send message</button>
        </form>
    </div>
  </section>
    }
    
</>
  )
}

export default ContactUs
