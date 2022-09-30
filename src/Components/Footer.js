import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
    // Get the Current year
    const year = new Date().getFullYear();
    
  return (
    <footer class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900 mb-10">
    <div class="sm:flex sm:items-center sm:justify-between">
        {/* <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
            <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a> */}
        <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400 justify-content-center">
            <li>
                <Link to="/" class="mr-4 hover:underline md:mr-6 ">About</Link>
            </li>
            <li>
                <Link to="/privacypolicy" class="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
            </li>
            {/* <li>
                <Link to="/" class="mr-4 hover:underline md:mr-6 ">Licensing</Link>
            </li> */}
            <li>
                <Link href="/contact" class="hover:underline">Contact</Link>
            </li>
        </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} iNotebook Inc.  All Rights Reserved.
    </span>
</footer>
  )
}

export default Footer
