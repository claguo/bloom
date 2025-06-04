import React, { useState } from "react";

function Button({ text, selected, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      className={`font-mono px-[8px] py-[8px] rounded-[8px] ${
        hovered
          ? "bg-bg-hovered"
          : pressed
          ? "bg-bg-pressed"
          : selected
          ? "bg-bg-selected text-text-default"
          : "text-text-subtle"
      } `}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {text}
    </button>
  );
}

export default Button;
