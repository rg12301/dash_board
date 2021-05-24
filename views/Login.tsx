import React from "react";
import Navbar from "../components/Navbar";

interface Props {}

const Login = (props: Props) => {
  return (
    <section className="w-screen h-screen flex flex-col justify-start items-center">
      <Navbar />
      <form
        className="mt-20 px-14 py-20 flex flex-col space-y-10 w-3/12 border border-gray-300 rounded-2xl"
        action=""
      >
        <h3 className="text-2xl font-semibold text-center">
          Welcome!
        </h3>
        <div className="flex flex-col items-center space-y-5">
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Password" />
        </div>
        <div className="flex flex-col items-center space-y-3">
          <button className="btn" type="button">
            Login
          </button>
          <span className="text-sm text-gray-500 hover:text-_blue font-medium hover:font-semibold cursor-pointer">
            Forgot Password?
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
