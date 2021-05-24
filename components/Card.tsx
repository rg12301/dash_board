import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={`inline-block p-5 rounded-2xl border-2 border-gray-400  hover:border-_blue cursor-pointer hover:text-_blue ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
