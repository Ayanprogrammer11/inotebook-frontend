import React from 'react'
import { useNavigate } from 'react-router-dom'



const Landing = () => {

    const Navigate = useNavigate();

const checkAuth = () => {
    if(!localStorage.getItem("token")) {
        Navigate("/login")
    } else {
        Navigate("/home")
    }
}

  return (
    <>
        

    <section class="my-4 bg-white text-center">
        <div className="w-full">
            <h1 className="mb-8 text-5xl font-extrabold">iNotebook for you</h1>
            <p className="font-light text-gray-500 md:text-lg lg:text-xl">
            iNotebook is a Notes taking application where you can save your notes and access them whenever you want
            </p>
            {/* <button className="rounded-lg text-center text-base font-medium text-black outline outline-2 outline-offset-0 outline-blue-600">Start Using</button> */}
            <button onClick={checkAuth} class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 mr-3 mt-10 inline-flex items-center justify-center rounded-lg px-5 py-2 text-center text-base font-medium text-black focus:ring-4">
                    Start Using
                    <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
        </div>
        
    </section>


    <section class="bg-gray-50">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
            <div class="mb-8 max-w-screen-md lg:mb-16">
                <h2 class="mb-4 text-4xl font-extrabold text-gray-900">Designed for your Life easiness</h2>
                <p class="text-gray-500 sm:text-xl">Here at iNotebook we take care of your privacy and everything you enter here will not be shared to anyone.</p>
            </div>
            <div class="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
                <div>
                    <div class="bg-primary-100 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
                        <svg class="text-primary-600 h-5 w-5 lg:h-6 lg:w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    </div>
                    <h3 class="mb-2 text-xl font-bold">Security</h3>
                    <p class="text-gray-500">Plan it, create it, Do it. Enter Notes seamlessly with all your Trust.</p>
                </div>
            </div>
        </div>
      </section>
    

      <section class="bg-white">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
                <h2 class="mb-4 text-4xl font-extrabold leading-tight text-gray-900">Start using the App now</h2>
                <button onClick={checkAuth} class="mb-6 font-bold font-light text-blue-800 md:text-lg">Try it</button>
                
            </div>
        </div>
    </section>

   
    
    <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>
    </>
  )
}

export default Landing
