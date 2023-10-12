import React from "react";

function Emoji(hovered) {
  console.log(hovered)
  return (
    <div className={`flex mt-[3rem] ${hovered ? 'bg-mid-gray' : 'bg-light-gray'} px-[1rem] py-[0.75rem] gap-[0.5rem] rounded-lg`}>
    <p className='shrink-0'>1 🌸 represents 10,000 people!</p>
    </div>
  )
}

export default Emoji;