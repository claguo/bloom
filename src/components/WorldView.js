import React, { useState, useEffect } from "react";
import Globe from "./Globe";
import Content from "./Content";

function WorldView({ active, setActive }) {
  const [name, setName] = useState("World Aggregate");
  const [stat, setStat] = useState("139,790,000");
  const [UNINT_PREG, setUNINT_PREG] = useState("230,180,000");
  const [UNINT_PERC, setUNINT_PERC] = useState("53");

  useEffect(() => {
    if (active) {
      setName(active.properties.ADMIN);
      setStat(active.properties.NUM_ABORT);
      setUNINT_PREG(active.properties.UNINT_PREG);
      setUNINT_PERC(active.properties.UNINT_PERC);
    } else {
      setName("World aggregate");
      setStat("139,790,000");
      setUNINT_PREG("230,180,000");
      setUNINT_PERC("53");
    }
  }, [active]);

  return (
    <div className="flex flex-col lg:flex-row rounded-[16px] bg-bg-green overflow-hidden flex-1 justify-between">
      <Content
        name={name}
        stat={stat}
        UNINT_PREG={UNINT_PREG}
        UNINT_PERC={UNINT_PERC}
        isUSA={false}
      />
      <Globe
        isUSA={false}
        active={active}
        setActive={setActive}
        activeId={active?.__id}
      />
    </div>
  );
}

export default WorldView;
