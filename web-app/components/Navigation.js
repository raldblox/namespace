"use client";

import React, { useContext, useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Provider, Network } from "aptos";
import { Context } from "@/app/layout";

const Navigation = () => {
  const [state, setState] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [evm, switchEvm] = useState(false);
  const { account, signAndSubmitTransaction } = useWallet();
  const { evmAccount, connectWallet } = useContext(Context);

  const navigation = [
    { title: "Features", path: "#features" },
    { title: "Community", path: "#community" },
    { title: "Token", path: "#token" },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  // useEffect(() => {
  //   setWallet(false);
  //   if (evmAccount) {
  //     switchEvm(true);
  //   } else {
  //     switchEvm(false);
  //   }
  // }, [account?.address, evmAccount]);

  return (
    <nav
      className={`sticky z-50 top-0 bg-white ${
        state
          ? "shadow-lg  rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="items-center px-4 py-3 mx-auto border-b-2 border-black gap-x-14 md:flex md:px-4">
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
          <div className="items-center justify-end flex-1 mt-6 space-y-6 gap-x-2 md:flex md:space-y-0 md:mt-0">
            <button className="bg-transparent" onClick={() => switchEvm(!evm)}>
              Switch to {evm ? "Aptos" : "EVM Chain"}
            </button>
            {evm ? (
              <>
                <button
                  className="h-full px-4 py-2"
                  disabled={!evm}
                  onClick={() => setWallet(true)}
                >
                  {evmAccount ? (
                    <>
                      {evmAccount.slice(0, 5)}...{evmAccount.slice(-5)}
                    </>
                  ) : (
                    "Connect Wallet"
                  )}
                </button>
              </>
            ) : (
              <WalletSelector />
            )}
          </div>
        </div>
      </div>
      {wallet ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setWallet(false)}
          ></div>
          <div className="flex items-center min-h-screen px-12 py-8">
            <div className="relative w-full max-w-lg p-8 mx-auto bg-white shadow-lg rounded-2xl">
              <div className="mt-4">
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-gray-800">
                    {evm ? (
                      <>{evmAccount ? "Connected" : "Connect"}</>
                    ) : (
                      <>{account ? "Connected" : "Connect"}</>
                    )}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-500">
                    {evm ? "to EVM Chain" : "to Aptos Network"}
                  </p>
                </div>
              </div>
              <div className="flex-col items-center gap-2 my-4 sm:flex">
                {evm ? (
                  <>
                    <button
                      onClick={connectWallet}
                      className="flex-1 p-2 text-white bg-black border outline-none wallet-button ring-offset-2 bg-dark ring-orange-600 focus:ring-2 hover:bg-orange-500"
                    >
                      {evmAccount ? <>{evmAccount}</> : "Connect Metamask"}
                    </button>
                  </>
                ) : (
                  <>
                    <WalletSelector />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navigation;
