import React from 'react'

const Loading = () => {
  return (
    <>
    {/* <div class="bg-white p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none my-6">
      <div class="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse" ></div>
      <div class="flex flex-col flex-1 gap-5 sm:p-2">
        <div class="flex flex-1 flex-col gap-3">
          <div class="bg-gray-200 w-full animate-pulse h-14 rounded-2xl" ></div>
          <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
        </div>
      </div>
</div>
 <div class="bg-white p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
 <div class="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse" ></div>
 <div class="flex flex-col flex-1 gap-5 sm:p-2">
   <div class="flex flex-1 flex-col gap-3">
     <div class="bg-gray-200 w-full animate-pulse h-14 rounded-2xl"></div>
     <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
     <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
     <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
     <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
   </div>

 </div>
</div> */}
<div class="mx-auto container py-10 px-6 mx-50">
  {/* First Item */}
          <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="rounded">
                  <div class="w-full h-auto flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-[30px] h-7 animate-pulse rounded-[100%] mt-10'></div>
                  </div>
              </div>
              {/* Second Item */}
              <div className="rounded">
                  <div class="w-full h-auto flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-[30px] h-7 animate-pulse rounded-[100%] mt-10'></div>
                  </div>
              </div>
              <div className="rounded">
                  <div class="w-full h-auto flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-[30px] h-7 animate-pulse rounded-[100%] mt-10'></div>
                  </div>
              </div>
              <div className="rounded">
                  <div class="w-full h-auto flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-full h-5 animate-pulse rounded-2xl my-2'></div>
                      <div className='bg-gray-200 w-[30px] h-7 animate-pulse rounded-[100%] mt-10'></div>
                  </div>
              </div>
              
          </div>
</div>
</>
  )
}

export default Loading
