import React from "react";

function UIContainer({children}) {
  return (
    <div className='w-[34vw] pl-[12rem] pr-[1rem] pt-[8rem] pb-[4rem] h-[100vh] overflow-visible flex flex-col justify-between gap-[2.5rem] z-10'>
      {children}
    </div>
  )
}

export default UIContainer;