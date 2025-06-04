import React from "react";
import Button from "./Button";

function FilterSort({ sortBy, setSortBy, dataSource, setDataSource }) {
  const handleAlphaClick = () => {
    if (sortBy === "alpha") {
      setSortBy("alpha-reverse");
    } else {
      setSortBy("alpha");
    }
  };

  const handleValueClick = () => {
    if (sortBy === "value") {
      setSortBy("value-reverse");
    } else {
      setSortBy("value");
    }
  };

  return (
    <div className="flex gap-[32px] no-scrollbar">
      <div className="flex gap-[4px]">
        <Button
          text={sortBy === "alpha-reverse" ? "Z → A" : "A → Z"}
          selected={sortBy === "alpha" || sortBy === "alpha-reverse"}
          onClick={handleAlphaClick}
        />
        <Button
          text={sortBy === "value-reverse" ? "LO → HI" : "HI → LO"}
          selected={sortBy === "value" || sortBy === "value-reverse"}
          onClick={handleValueClick}
        />
      </div>
      <div className="flex gap-[4px]">
        <Button
          text="WORLD"
          selected={dataSource === "world"}
          onClick={() => setDataSource("world")}
        />
        <Button
          text="USA"
          selected={dataSource === "usa"}
          onClick={() => setDataSource("usa")}
        />
      </div>
    </div>
  );
}

export default FilterSort;
