import React, { useState } from "react";

function ListItem(props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`flex justify-between ${hovered ? 'bg-dark-gray' : 'bg-mid-gray'} py-[0.5rem] px-[1rem]`}>
      <h1 className=''>{props.name}</h1>
      <h1 className='font-mono font-semibold'>{props.num}</h1>
    </div>
  )
}

export default ListItem;