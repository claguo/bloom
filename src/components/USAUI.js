import React from "react";
import Scale from "./Scale"
import TenThousand from "./TenThousand";
import OtherStats from "./OtherStats";
import List from "./List";

function USAUI(props) {
  const {hoverD, setHoverD} = props;

  return (
    <div className='w-[34vw] pl-[12rem] pt-[8rem] pb-[4rem] h-[100vh] overflow-visible flex flex-col justify-between z-10'>
      <div>
        {hoverD ? (
          <h1 className='text-lg font-semibold whitespace-nowrap'>{hoverD.properties.NAME}</h1>
        ) : (
          <h1 className='text-lg font-semibold whitespace-nowrap'>United States Aggregate</h1>
        )}
        {hoverD ? (
          <>
            <p className='text-xl font-mono font-semibold'>{hoverD.properties.NUM_ABORT_RES.toLocaleString()}</p>
            <p className='font-semibold'>abortions</p>
            <p>by state of residence, 2020</p>
          </>
        ) : (
          <>
            <p className='text-xl font-mono font-semibold'>930,160</p>
            <p className='font-semibold'>abortions</p>
            <p>2020</p>
          </>
        )}

        {hoverD ? (
          <OtherStats count={hoverD.properties.ABORT_RATE_RES} countLabel='abortions per 1,000 women' percent={hoverD.properties.PERC_TRAVELED} page='usa'/>
        ):(
          <OtherStats count='n/a' countLabel='abortions per 1,000 women' percent='n/a' page='usa'/>
        )}
      </div>

      <List page='usa' hoverD={hoverD} setHoverD={setHoverD}/>

      <div>
        <div className='flex'>
          <Scale scale={1000} openModal={props.openModal} setOpenModal={props.setOpenModal}/>
          {props.openModal ? (
            <TenThousand scale={1000}/>
          ):null}
        </div>
        {/* <p>Designed and built by Claire Guo! More about this project on my personal website. View source code on Github.</p>
        <p>Data from Guttmacher Institute Data Center.</p> */}
      </div>
    </div>
  )
}

export default USAUI;