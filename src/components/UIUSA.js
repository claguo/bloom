import React, { useState, useEffect } from "react";
import Scale from "./Scale"
import TenThousand from "./TenThousand";
import PercentageBar from "./PercentageBar";
import List from "./List";
import Heading from "./Heading";
import UIContainer from "./UIContainer";
import { useUSAState } from '../assets/StateContext';

function UIUSA(props) {
  const {hoverD, setHoverD} = props;
  const {USAStates} = useUSAState();
  const [name, setName] = useState("United States Aggregate");
  const [stat, setStat] = useState("930,160");
  const [ABORT_RATE_RES, setABORT_RATE_RES] = useState("-");
  const [PERC_TRAVELED, setPERC_TRAVELED] = useState("-");
  const [labelDetails, setLabelDetails] = useState("2020");

  useEffect(() => {
    if (hoverD) {
      setName(hoverD.properties.NAME);
      setStat(hoverD.properties.NUM_ABORT_RES);
      setABORT_RATE_RES(hoverD.properties.ABORT_RATE_RES);
      setPERC_TRAVELED(hoverD.properties.PERC_TRAVELED);
      setLabelDetails("by state of residence, 2020");
    } else {
      setName("United States Aggregate");
      setStat("930,160");
      setABORT_RATE_RES("-");
      setPERC_TRAVELED("-");
      setLabelDetails("2020");
    }
  }, [hoverD]);

  return (
    <UIContainer>
      <Heading name={name} stat={stat} label="total abortions" labelDetails={labelDetails}/>
      <PercentageBar count={ABORT_RATE_RES} countLabel='abortions per 1,000 women' percent={PERC_TRAVELED} percLabel='residents traveled out of state for care'/>
      <List items={USAStates} title="States List" hoverD={hoverD} setHoverD={setHoverD}/>

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
    </UIContainer>
  )
}

export default UIUSA;