import React from "react";
import TextStack from "./TextStack";

function StatDisplay({ stat, description }) {
  return (
    <div>
      <p className="text-[60px] font-mono">{stat.toLocaleString()}</p>
      {stat !== "-" ? (
        <p className="font-sans">{description}</p>
      ) : (
        <p className="font-sans">No data</p>
      )}
    </div>
  );
}

function WorldDescription({ stat, UNINT_PREG, UNINT_PERC }) {
  return `Between 2015 and 2019, there were ${stat.toLocaleString()} abortions among women aged 15-49, annually. Out of a total of ${UNINT_PREG.toLocaleString()} unintended pregnancies, ${UNINT_PERC}% ended in abortion.`;
}

function USADescription({ name, stat, ABORT_RATE_RES, PERC_TRAVELED }) {
  if (name === "United States aggregate") {
    return `In 2020, there were ${stat.toLocaleString()} total abortions among women aged 15-49 in the United States.`;
  }
  return `Between 2015 and 2019, there were ${stat.toLocaleString()} total abortions among women aged 15-49 in the state of ${name}. ${ABORT_RATE_RES} out of every 1,000 women had an abortion, and ${PERC_TRAVELED}% traveled out of state for care.`;
}

function Content({
  name,
  stat,
  UNINT_PREG,
  UNINT_PERC,
  isUSA = false,
  ABORT_RATE_RES,
  PERC_TRAVELED,
}) {
  const getDescription = () => {
    if (isUSA) {
      return USADescription({ name, stat, ABORT_RATE_RES, PERC_TRAVELED });
    }
    return WorldDescription({ stat, UNINT_PREG, UNINT_PERC });
  };

  return (
    <div className="lg:min-w-[320px] lg:max-w-[320px] flex flex-col gap-[40px] pl-[32px] pt-[40px] z-10">
      <TextStack title={isUSA ? "STATE" : "COUNTRY"}>
        <p className="font-sans">{name}</p>
      </TextStack>
      <TextStack title={isUSA ? "TOTAL ABORTIONS" : "ANNUAL ABORTIONS"}>
        <StatDisplay stat={stat} description={getDescription()} />
      </TextStack>
      <TextStack title="KEY">
        <p>Each 🌸 represents {isUSA ? "1,000" : "10,000"} women.</p>
      </TextStack>
    </div>
  );
}

export default Content;
