import React, { useState } from "react";

function ListItem(props) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <li
      onClick={() => {
        props.selected
          ? props.setActive(null)
          : props.setActive && props.setActive(props.item);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={`flex justify-between cursor-pointer rounded-[4px] px-[4px] pt-[2px] text-text-default ${
        props.selected ? "bg-bg-selected" : ""
      } ${hovered ? "bg-bg-hovered" : ""} ${pressed ? "bg-bg-pressed" : ""}`}
    >
      <span>{props.item.properties.NAME || props.item.properties.ADMIN}</span>
      <span>{props.num}</span>
    </li>
  );
}

export default ListItem;
