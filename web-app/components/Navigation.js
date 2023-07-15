"use client";

import React, { useEffect, useState } from "react";

const Navigation = () => {
  const [state, setState] = useState(false);

  const navigation = [
    { title: "Features", path: "javascript:void(0)" },
    { title: "Integrations", path: "javascript:void(0)" },
    { title: "Customers", path: "javascript:void(0)" },
    { title: "Pricing", path: "javascript:void(0)" },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);
  return (
    <nav
      className={`sticky top-0 bg-white ${
        state
          ? "shadow-lg  rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="items-center px-4 py-2 mx-auto border-b-2 border-black gap-x-14 md:flex md:px-4">
        <div className="flex items-center justify-between md:block">
          <a href="/">
            <img
              src="/namespace-dark.svg"
              width={120}
              height={50}
              alt="Namespace Logo"
            />
          </a>
          <div className="md:hidden">
            <button className="menu-btn" onClick={() => setState(!state)}>
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          } `}
        >
          <ul className="items-center justify-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="">
                  <a href={item.path} className="block">
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="items-center justify-end flex-1 mt-6 space-y-6 gap-x-6 md:flex md:space-y-0 md:mt-0">
            <a href="javascript:void(0)" className="block">
              Log in
            </a>
            <button className="px-4 py-2">Connect Account</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
