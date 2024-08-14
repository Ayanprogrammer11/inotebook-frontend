import React from 'react'

const Loading = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="rounded">
            <div className="mb-6 flex h-auto w-full flex-col justify-between rounded-lg border border-gray-400 bg-white px-4 py-5">
              <div className='my-2 h-5 w-full animate-pulse rounded-2xl bg-gray-200'></div>
              <div className='my-2 h-5 w-full animate-pulse rounded-2xl bg-gray-200'></div>
              <div className='my-2 h-5 w-full animate-pulse rounded-2xl bg-gray-200'></div>
              <div className='mt-10 h-7 w-[30px] animate-pulse rounded-full bg-gray-200'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading