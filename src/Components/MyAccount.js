import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';


const host = "https://screeching-kitti-ayanliaqat-8e939237.koyeb.app";
const MyAccount = ({ showToast, setProgress }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const closeAfterDeletion = useRef(null);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [ing, setIng] = useState("Delete Account");
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    const response = await fetch(`${host}/api/v1/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    const json = await response.json();
    setUserDetails({
      name: json.name,
      email: json.email
    })
  }

  const deleteUser = async (e) => {
    e.preventDefault();
    setIng("Deleting Account...")
    const response = await fetch(`${host}/api/v1/auth/deleteuser`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    await response.json();
    localStorage.removeItem("token")
    closeAfterDeletion.current.click();
    setIng("Delete Account")
    navigate("/signup");
    showToast.success('Account Deleted!')
  }

  useEffect(() => {
    setProgress(10)
    fetchData().then(() => {
      setLoading(false);
      setProgress(100);
    });
  }, [location.pathname, setProgress])

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="mb-4 text-center text-4xl font-bold">Your Account</h1>
      <div className="space-y-4 rounded-md shadow-sm">
        <input 
          type="text" 
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
          placeholder="Name" 
          value={userDetails.name} 
          disabled
        />
        <input 
          type="email" 
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
          placeholder="Email" 
          value={userDetails.email} 
          disabled
        />
      </div>
      <div className="my-10 text-center">
        <button className="w-full rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 sm:w-auto" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          Delete Account
        </button>
      </div>


{/* <!-- Modal --> */}
<form onSubmit={deleteUser}>
<div class="modal fade fixed left-0 top-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
  id="exampleModal2" tabindex="-1" aria-labelledby="exampleModal2Label" aria-hidden="true">
  <div class="modal-dialog pointer-events-none relative w-auto">
    <div
      class="modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
      <div class="modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModal2Label">Alert</h5>
        <button type="button" class="btn-close box-content h-4 w-4 rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative p-4">
      <h6 className="text-md font-bold text-red-500">Note: You will not be able to recover your account after deleting, Are you sure you want to Delete your Account?</h6>
      </div>
      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t border-gray-200 p-4">
        <button type="button" class="rounded bg-purple-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg" data-bs-dismiss="modal" ref={closeAfterDeletion}>Close</button>
        <button type="submit" class="ml-1 rounded bg-red-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg" disabled={ing === "Deleting Account..."}>{ing}</button>
      </div>
    </div>
  </div>
</div>
</form>
</>

  )
}

export default MyAccount
