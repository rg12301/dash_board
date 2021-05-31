import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { ChevronUpIcon } from "@heroicons/react/solid";
interface Props<OptionType> {
  options?: OptionType[];
  defaultSelected?: number;
}

const Select = <OptionType extends string | number>({
  options = [],
  defaultSelected = 0,
}: Props<OptionType>) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selected, setSelected] = useState<OptionType>(
    options[defaultSelected]
  );
  return (
    <div className="relative text-sm font-medium">
      <button
        value={selected}
        className="input flex flex-row justify-between items-center"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {selected}
        {expanded ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </button>
      <div
        className={`${
          expanded || "hidden"
        } absolute z-10 top-10 py-2 w-full flex flex-col bg-_blue text-white rounded-xl shadow-lg`}
        onMouseLeave={() => {
          setExpanded(!expanded);
        }}
      >
        {options.map((option, index) => {
          if (option !== selected) {
            return (
              <div
                key={index}
                className="px-4 py-1 font-semibold hover:bg-white hover:text-_blue cursor-pointer"
                onClick={() => {
                  setSelected(option);
                  setExpanded(!expanded);
                }}
              >
                {option}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Select;
