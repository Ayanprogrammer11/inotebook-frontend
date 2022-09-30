import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const MyAccount = (props) => {
  const {showToast} = props;
   const Navigate = useNavigate();
const closeAfterDeletion = useRef(null);
     const [userDetails, setUserDetails] = useState({name: "", email: ""});
     const [ing, setIng] = useState("Delete Account");
  
    const fetchData = async () =>{

        const response = await fetch("http://localhost:5000/api/auth/getuser", {
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
        const response = await fetch("http://localhost:5000/api/auth/deleteuser", {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
          }
        })
        const json = await response.json();
        localStorage.removeItem("token")
        console.log(json);
        closeAfterDeletion.current.click();
        setIng("Delete Account")
        Navigate("/signup");
        showToast.success('Account Deleeted!')
      }

fetchData();



  return (
    <>
    <h1 className="text-4xl font-bold text-center mb-4">Your Account</h1>
    <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Name</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-500 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Name" value={userDetails.name} disabled/>
        </div>
        <div>
          <label for="password" class="sr-only">Email</label>
          <input id="password" name="password" type="Email" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-500 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email" value={userDetails.email} disabled/>
        </div>
      </div>
  <div className="text-center my-10">
  <button  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-red-800" data-bs-toggle="modal" data-bs-target="#exampleModal2">
      Delete Account
    </button>
  </div>
 

{/* <!-- Modal --> */}
<form onSubmit={deleteUser}>
<div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
  id="exampleModal2" tabindex="-1" aria-labelledby="exampleModal2Label" aria-hidden="true">
  <div class="modal-dialog relative w-auto pointer-events-none">
    <div
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModal2Label">Alert</h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative p-4">
      <h6 className="text-red-500 text-md font-bold">Note: You will not be able to recover your account after deleting, Are you sure you want to Delete your Account?</h6>
      </div>
      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button type="button" class="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out" data-bs-dismiss="modal" ref={closeAfterDeletion}>Close</button>
        <button type="submit" class="px-6
      py-2.5
      bg-red-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-red-700 hover:shadow-lg
      focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-red-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1" disabled={ing === "Deleting Account..."}>{ing}</button>
      </div>
    </div>
  </div>
</div>
</form>
  </>

  )
}

export default MyAccount
