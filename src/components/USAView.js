import React, { useState, useEffect } from "react";
import Globe from "./Globe";
import Content from "./Content";

function USAView({ active, setActive }) {
  const [name, setName] = useState("United States Aggregate");
  const [stat, setStat] = useState("930,160");
  const [ABORT_RATE_RES, setABORT_RATE_RES] = useState("-");
  const [PERC_TRAVELED, setPERC_TRAVELED] = useState("-");

  useEffect(() => {
    if (active) {
      setName(active.properties.NAME);
      setStat(active.properties.NUM_ABORT_RES);
      setABORT_RATE_RES(active.properties.ABORT_RATE_RES);
      setPERC_TRAVELED(active.properties.PERC_TRAVELED);
    } else {
      setName("United States aggregate");
      setStat("930,160");
      setABORT_RATE_RES("-");
      setPERC_TRAVELED("-");
    }
  }, [active]);

  return (
    <div className="flex flex-col lg:flex-row rounded-[16px] bg-bg-green overflow-hidden flex-1 justify-between">
      <Content
        name={name}
        stat={stat}
        isUSA={true}
        ABORT_RATE_RES={ABORT_RATE_RES}
        PERC_TRAVELED={PERC_TRAVELED}
      />
      <Globe
        isUSA={true}
        active={active}
        setActive={setActive}
        activeId={active?.__id}
      />
    </div>
  );
}

export default USAView;
