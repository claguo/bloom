import React from "react";

function OtherStats(props) {

  return (
    <div className='mt-[3rem]'>
      <div className='flex justify-between'>
        <h2 className='font-semibold font-mono'>{props.count.toLocaleString()}</h2>
        <h2 className=''>{props.countLabel}</h2>
      </div>
      <div className='flex justify-between'>
        {props.percent === 'n/a' ? (
          <h2 className='font-semibold font-mono'>{props.percent}</h2>
        ):(
          <h2 className='font-semibold font-mono'>{props.percent}%</h2>
        )}
        {props.page === 'usa' ? (
          <h2 className=''>residents traveled out of state for care</h2>
        ) : (
          <h2 className=''>ended in abortion</h2>
        )}
      </div>
      <div className='bg-blue h-[1rem] mt-[0.25rem] w-[100%] rounded-xl overflow-hidden'>
        <div className='bg-dark-blue h-[100%] rounded-xl' style={{width: `${props.percent}%`}} />
      </div>
    </div>
  )
}

export default OtherStats;