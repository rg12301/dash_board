import React from "react";

interface Props {
  text: string;
  position: "right" | "left" | "center";
}

const Tooltip = ({ text, position }: Props) => {
  return (
    <div className="absolute -top-8 -left-7 mx-2 hidden group-scope-hover:inline-block">
      <div className="flex flex-col space-y-0">
        <span className="bg-gray-800 text-white text-xs rounded py-1 px-4 right-0">
          {text}
        </span>
        <svg
          className="bg-white text-gray-800 h-2 left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon
            className="fill-current"
            points="0,0 127.5,127.5 255,0"
          />
        </svg>
      </div>
    </div>
  );
};

export default Tooltip;
