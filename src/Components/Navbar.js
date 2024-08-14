import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 const host = "https://screeching-kitti-ayanliaqat-8e939237.koyeb.app";
const Navbar = ({ showToast }) => {
 
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    showToast.success("Logged out Successfully");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (localStorage.getItem("token")) {
        try {
          const response = await fetch(`${host}/api/v1/auth/getuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            }
          });
          const json = await response.json();
          setUserName(json.name);
        } catch (error) {
          showToast.error("There was an error retrieving user data");
        }
      }
    };

    fetchUserData();
  }, [showToast]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white">iNotebook</Link>
        <div className="flex items-center">
          <Link to="/" className="mx-2 text-white">Home</Link>
          <Link to="/contactus" className="mx-4 text-white">Contact Us</Link>
          {!localStorage.getItem("token") ? (
            <>
              <Link to="/login" className="mx-2 rounded bg-blue-500 px-4 py-2 text-white">Login</Link>
              <Link to="/signup" className="mx-2 rounded bg-green-500 px-4 py-2 text-white">Signup</Link>
            </>
          ) : (
            <div className="group relative">
              <button className="rounded bg-blue-500 px-4 py-2 text-white">
                Welcome, {userName}
              </button>
              <div className="absolute right-0 mt-2 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
                <Link to="/myaccount" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;