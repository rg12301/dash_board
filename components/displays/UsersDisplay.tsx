import React, { useState } from "react";
import { User, roleMap } from "../../utilities/types";
import Select from "../Select";
import Tooltip from "../Tooltip";
import {
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/solid";

interface Props {}

const UsersDisplay = (props: Props) => {
  const rows: User[] = [
    {
      name: "Raghav Goyal",
      role: "Developer",
      lastAccessed: new Date(),
      email: "raghav@email.com",
    },
    {
      name: "Raghav Goyal",
      role: "Developer",
      lastAccessed: new Date(),
      email: "raghav@email.com",
    },
    {
      name: "Raghav Goyal",
      role: "Manager",
      lastAccessed: new Date(),
      email: "raghav@email.com",
    },
  ];

  return (
    <div className="my-10 px-20 w-full flex flex-row justify-center items-center">
      <div className="w-full text-sm">
        <h3 className="text-3xl font font-bold text-center">
          Users
        </h3>
        <div className="table table-fixed w-full mt-10 border-t border-r border-l border-gray-300 rounded-t-xl bg-_blue text-center">
          <div className="table-header-group font-bold border-b">
            <div className="table-row text-white">
              <div className={`cell w-2/12`}>Name</div>
              <div className={`cell w-2/12`}>Email</div>
              <div className={`cell w-2/12`}>
                Last Accessed
              </div>
              <div className={`cell w-2/12`}>Role</div>
              <div className={`cell w-1/12`}></div>
            </div>
          </div>
          <div className="table-row-group bg-white">
            {rows.map((row, index) => {
              const [actionState, setActionState] =
                useState(-1);
              return (
                <div
                  className={`table-row group-scope ${
                    actionState === -1
                      ? "bg-white"
                      : actionState === 0
                      ? "bg-red-50"
                      : "bg-green-50"
                  }`}
                  key={index}
                >
                  <div className="cell">{row.name}</div>
                  <div className="cell">{row.email}</div>
                  <div className="cell">
                    {row.lastAccessed.toDateString()}
                  </div>
                  <div className="cell">
                    <Select
                      options={[
                        "Admin",
                        "Manager",
                        "Developer",
                      ]}
                      defaultSelected={roleMap[row.role]}
                    />
                  </div>
                  <div className="cell">
                    <div className="group-scope-hover:flex flex-row justify-end space-x-6 hidden">
                      <div
                        className="relative group-scope group-1"
                        onMouseEnter={() => {
                          setActionState(0);
                        }}
                        onMouseLeave={() => {
                          setActionState(-1);
                        }}
                      >
                        <Tooltip
                          text="Delete"
                          position="center"
                        />
                        <TrashIcon className="w-6 h-6 hover:text-red-600 cursor-pointer" />
                      </div>
                      <div
                        className="relative group-scope"
                        onMouseEnter={() => {
                          setActionState(2);
                        }}
                        onMouseLeave={() => {
                          setActionState(-1);
                        }}
                      >
                        <Tooltip
                          text="Edit"
                          position="center"
                        />
                        <PencilIcon className="w-6 h-6 hover:text-green-600 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersDisplay;
