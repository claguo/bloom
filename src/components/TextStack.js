import React from "react";

function Heading({ title, children, lightMode }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <h1
        className={`text-[14px] font-mono ${
          lightMode ? "text-text-subtle" : "text-text-inverse-subtle"
        }`}
      >
        {title}
      </h1>
      {children}
    </div>
  );
}

export default Heading;
