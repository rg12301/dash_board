import React from "react";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="w-full px-10 md:px-16 py-8">
      <span className="text-2xl md:text-3xl font-bold tracking-wider text-_blue">
        <span className="tracking-tighter font-extrabold">
          ___&nbsp;
        </span>
        board
      </span>
    </nav>
  );
};

export default Navbar;
