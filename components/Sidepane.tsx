import React, { useState } from "react";
import Tab from "./Tab";
import { MenuIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";

interface Props {
  changeDisplay: React.Dispatch<{
    type: string;
  }>;
}

export interface TabBody {
  readonly name: string;
  selected: boolean;
}

const Sidepane = ({ changeDisplay }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const initialTabs: TabBody[] = [
    { name: "Dashboard", selected: false },
    { name: "Users", selected: false },
    { name: "Members", selected: false },
    { name: "Articles", selected: false },
    { name: "Feedback", selected: false },
    { name: "Reports", selected: false },
    { name: "Notifications", selected: false },
    { name: "Adverts", selected: false },
  ];
  const [tabs, setTabs] = useState<Array<TabBody>>([
    { name: "Dashboard", selected: true },
    ...initialTabs.slice(1),
  ]);

  const handleExpand = (state: boolean) => {
    setExpanded(!state);
  };

  const handleSelect = (selectedTab: TabBody) => {
    const updatedTabs = initialTabs.filter((tab) => {
      if (tab.name === selectedTab.name) {
        tab.selected = true;
      }
      return true;
    });
    setTabs([...updatedTabs]);
  };

  return (
    <section
      className={`${
        expanded && "w-2/5 md:w-3/12 lg:w-1/6"
      } min-h-screen pt-12 bg-_blue`}
    >
      <div
        className="w-7 h-7 mx-10 text-white cursor-pointer"
        onClick={() => {
          handleExpand(expanded);
        }}
      >
        {expanded ? <XIcon /> : <MenuIcon />}
      </div>
      <div className="mt-10">
        {tabs.map((tab) => {
          return (
            <Tab
              text={tab.name}
              expanded={expanded}
              selected={tab.selected}
              onClick={() => {
                handleSelect(tab);
                changeDisplay({
                  type: tab.name.toUpperCase(),
                });
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Sidepane;
