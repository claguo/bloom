import React, { useState } from "react";
import USAGlobe from "../components/USAGlobe";
import UIUSA from "../components/UIUSA";

function USAPage() {
  const [hoverD, setHoverD] = useState();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='w-[94vw] flex'>
      <UIUSA hoverD={hoverD} setHoverD={setHoverD} openModal={openModal} setOpenModal={setOpenModal}/>
      <USAGlobe hoverD={hoverD} setHoverD={setHoverD}/>
    </div>
  )
}

export default USAPage;