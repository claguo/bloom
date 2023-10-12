import React from "react";

function Scale(props) {
  return (
    <div className={`mb-[3rem] cursor-default flex z-50 items-baseline px-[0.75rem] py-[0.25rem] rounded-2xl ${props.openModal ? 'text-dark-blue' : 'text-white'} ${props.openModal ? 'bg-light-gray' : 'bg-dark-blue'}`}
    onMouseEnter={() => props.setOpenModal(true)}
    onMouseLeave={() => props.setOpenModal(false)}>
      <p className='shrink-0'>One 🌸 represents {props.scale.toLocaleString()} women</p>
    </div>
  )
}

export default Scale;