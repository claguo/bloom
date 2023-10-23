import React from "react";

function PercentageBar(props) {

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='font-semibold font-mono'>{props.count.toLocaleString()}</h2>
        <h2 className=''>{props.countLabel}</h2>
      </div>
      
      <div className='flex justify-between'>
        {props.percent === '-' ? (
          <h2 className='font-semibold font-mono'>{props.percent}</h2>
        ):(
          <h2 className='font-semibold font-mono'>{props.percent}%</h2>
        )}
        <h2>{props.percLabel}</h2>
      </div>
      
      <div className='bg-blue h-[1rem] mt-[0.25rem] w-[100%] rounded-xl overflow-hidden'>
        <div className='bg-dark-blue h-[100%] rounded-xl' style={{width: `${props.percent}%`}} />
      </div>
    </div>
  )
}

export default PercentageBar;