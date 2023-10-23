import React, { useState, useEffect } from "react";
import Scale from "./Scale"
import TenThousand from "./TenThousand";
import PercentageBar from "./PercentageBar";
import List from "./List";
import Heading from "./Heading";
import UIContainer from "./UIContainer";
import { useCountry } from '../assets/CountryContext';

function UIWorld(props) {
  const {hoverD, setHoverD} = props;
  const {countries} = useCountry();
  const [name, setName] = useState("World Aggregate");
  const [stat, setStat] = useState("139,790,000");
  const [UNINT_PREG, setUNINT_PREG] = useState("230,180,000");
  const [UNINT_PERC, setUNINT_PERC] = useState("53");

  useEffect(() => {
    if (hoverD) {
      setName(hoverD.properties.ADMIN);
      setStat(hoverD.properties.NUM_ABORT);
      setUNINT_PREG(hoverD.properties.UNINT_PREG);
      setUNINT_PERC(hoverD.properties.UNINT_PERC);
    } else {
      setName("World Aggregate");
      setStat("139,790,000");
      setUNINT_PREG("230,180,000");
      setUNINT_PERC("53");
    }
  }, [hoverD]);

  return (
    <UIContainer>
      <Heading hoverD={hoverD} name={name} stat={stat} label="abortions annually" labelDetails="among women aged 15-49, 2015-2019"/>
      <PercentageBar count={UNINT_PREG} countLabel='unintended pregnancies' percent={UNINT_PERC} percLabel='ended in abortion'/>
      <List items={countries} title="Countries List" hoverD={hoverD} setHoverD={setHoverD}/>

      <div className='flex'>
        <Scale scale={10000} openModal={props.openModal} setOpenModal={props.setOpenModal}/>
        {props.openModal ? (
          <TenThousand />
        ) : null}
      </div>
        {/* <p>Designed and built by Claire Guo! More about this project on my personal website. View source code on Github.</p>
        <p>Data from Guttmacher Institute Data Center.</p> */}
    </UIContainer>
  )
}

export default UIWorld;