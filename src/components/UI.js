import React from "react";
import Scale from "./Scale"
import TenThousand from "./TenThousand";
import OtherStats from "./OtherStats";
import List from "./List";

function UI(props) {
  const {hoverD, setHoverD} = props;

  return (
    <div className='w-[34vw] pl-[12rem] pt-[8rem] pb-[4rem] h-[100vh] overflow-visible flex flex-col justify-between z-10'>
      <div>
        {hoverD ? (
          <h1 className='text-lg font-semibold whitespace-nowrap'>{hoverD.properties.ADMIN}</h1>
        ) : (
          <h1 className='text-lg font-semibold whitespace-nowrap'>World Aggregate</h1>
        )}
        {hoverD ? (
          <p className='text-xl font-mono font-semibold'>{hoverD.properties.NUM_ABORT.toLocaleString()}</p>
        ) : (
          <p className='text-xl font-mono font-semibold'>139,790,000</p>
        )}
        <p className='font-semibold'>abortions annually</p>
        <p>among women aged 15-49, 2015-2019</p>

        {hoverD ? (
          <OtherStats count={hoverD.properties.UNINT_PREG} countLabel='unintended pregnancies' percent={hoverD.properties.UNINT_PERC} />
        ) : (
          <OtherStats count={230180000} countLabel='unintended pregnancies' percent={53} />
        )}
      </div>

      <List page='world' hoverD={hoverD} setHoverD={setHoverD}/>

      <div>
        <div className='flex'>
          <Scale scale={10000} openModal={props.openModal} setOpenModal={props.setOpenModal}/>
          {props.openModal ? (
            <TenThousand />
          ):null}
        </div>
        {/* <p>Designed and built by Claire Guo! More about this project on my personal website. View source code on Github.</p>
        <p>Data from Guttmacher Institute Data Center.</p> */}
      </div>
    </div>
  )
}

export default UI;