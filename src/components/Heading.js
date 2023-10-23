import React from "react";

function Heading(props) {

  return (
    <div>
      <h1 className='text-lg font-semibold whitespace-nowrap'>{props.name}</h1>
      {props.stat === '-' ? (
        <p className='text-xl font-mono font-semibold'>no data</p>
      ) : (
        <p className='text-xl font-mono font-semibold'>{props.stat.toLocaleString()}</p>
      )}
      <p className='font-semibold'>{props.label}</p>
      <p>{props.labelDetails}</p>
    </div>
  )
}

export default Heading;