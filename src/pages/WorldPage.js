import React, { useState } from "react";
import Globe from "../components/Globe";
import UIWorld from "../components/UIWorld";

function Content() {
  const [openModal, setOpenModal] = useState(false);
  const [hoverD, setHoverD] = useState();

  return (
    <div className='w-[94vw] flex'>
      <UIWorld openModal={openModal} setOpenModal={setOpenModal} hoverD={hoverD} setHoverD={setHoverD}/>
      <Globe hoverD={hoverD} setHoverD={setHoverD} openModal={openModal}/>
    </div>
  )
}

export default Content;