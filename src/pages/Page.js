import React, { useState } from "react";
import List from "../components/List";
import TextStack from "../components/TextStack";
import { useCountry } from "../assets/CountryContext";
import { useStatesData } from "../assets/StatesContext";
import WorldView from "../components/WorldView";
import USAView from "../components/USAView";

function Page() {
  const [active, setActive] = useState(null);
  const [dataSource, setDataSource] = useState("world"); // "world" or "usa"

  const { countries } = useCountry();
  const { statesData } = useStatesData();

  const handleDataSourceChange = (source) => {
    setDataSource(source);
    setActive(null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-[20px] lg:h-[100vh] w-[100vw] bg-neutral-bg p-[16px]">
      {dataSource === "world" ? (
        <WorldView
          active={active}
          setActive={setActive}
          dataSource={dataSource}
        />
      ) : (
        <USAView
          active={active}
          setActive={setActive}
          dataSource={dataSource}
        />
      )}

      <div className="overflow-hidden flex flex-col gap-[40px] py-[8px] lg:min-w-[320px] lg:max-w-[320px] ">
        <TextStack title="ABOUT" lightMode={true}>
          <p className="text-text-default">
            This project was created using React and Globe.gl, with data sourced
            from Guttmacher Institute Data Center. Learn more about BLOOMS{" "}
            <a
              href="https://claireguo.com/blooms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-text-hover"
            >
              here ↗
            </a>
            .
          </p>
        </TextStack>
        <List
          items={dataSource === "world" ? countries : statesData}
          active={active}
          setActive={setActive}
          activeId={active?.__id}
          dataSource={dataSource}
          setDataSource={handleDataSourceChange}
        />
      </div>
    </div>
  );
}

export default Page;
