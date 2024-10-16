import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className=" bg-slate-100 f border-t ">
      <div className=" max-w-6xl mx-auto px-4 flex  items-center flex-col mt-4 sm:mt-0 sm:flex-row sm:justify-between h-16">
        <h1 className="text-slate-700">©{currentYear} All rights reserved</h1>
        <h1 className="text-md ">
          <span className="text-slate-700"> Made with love by</span>{" "}
          <a
            href="https://www.linkedin.com/in/faisalahmed23/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            @faisal
          </a>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
