import React, { useState } from "react";
import ListItem from "./ListItem";
import FilterSort from "./FilterSort";

function List(props) {
  const [sortBy, setSortBy] = useState("alpha"); // "alpha", "alpha-reverse", "value", or "value-reverse"
  // const [dataSource, setDataSource] = useState("world"); // "world" or "usa"
  const sortedItems = [...props.items.features].sort((a, b) => {
    if (sortBy === "alpha" || sortBy === "alpha-reverse") {
      const comparison = (
        a.properties.NAME || a.properties.ADMIN
      ).localeCompare(b.properties.NAME || b.properties.ADMIN);
      return sortBy === "alpha-reverse" ? -comparison : comparison;
    } else {
      const aValue =
        props.dataSource === "usa"
          ? a.properties.NUM_ABORT_RES
          : a.properties.NUM_ABORT;
      const bValue =
        props.dataSource === "usa"
          ? b.properties.NUM_ABORT_RES
          : b.properties.NUM_ABORT;

      // If either value is "-", handle special case
      if (aValue === "-" && bValue === "-") return 0;
      if (aValue === "-") return 1; // Move a to the end
      if (bValue === "-") return -1; // Move b to the end

      return sortBy === "value-reverse" ? aValue - bValue : bValue - aValue; // High to low or low to high
    }
  });

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-col text-text-subtle font-mono px-[4px] bg-bg-neutral gap-[16px] pb-[8px] justify-between">
        <span>COUNTRIES</span>
        <FilterSort
          sortBy={sortBy}
          setSortBy={setSortBy}
          dataSource={props.dataSource}
          setDataSource={props.setDataSource}
        />
      </div>

      <ul className="pt-[8px] flex-1 overflow-y-auto min-h-0 pr-[8px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D8D6D4] [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-[#D8D6D4CC]">
        {sortedItems.map((s) => {
          const isSelected = props.activeId && s && props.activeId === s.__id;

          return props.dataSource === "usa" ? (
            <ListItem
              key={s.id}
              item={s}
              num={s.properties.NUM_ABORT_RES.toLocaleString()}
              setActive={props.setActive}
              active={props.active}
              selected={isSelected}
            />
          ) : (
            <ListItem
              key={s.id}
              item={s}
              num={s.properties.NUM_ABORT.toLocaleString()}
              setActive={props.setActive}
              active={props.active}
              selected={isSelected}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default List;
