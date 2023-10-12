import React, { useState } from "react";
import USAGlobe from "../components/USAGlobe";
import USAUI from "../components/USAUI";

function USAPage() {
  const [hoverD, setHoverD] = useState();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='w-[94vw] flex'>
      <USAUI hoverD={hoverD} setHoverD={setHoverD} openModal={openModal} setOpenModal={setOpenModal}/>
      <USAGlobe hoverD={hoverD} setHoverD={setHoverD}/>
    </div>
  )
}

export default USAPage;