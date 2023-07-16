import React from "react";

const Landing = () => {
  return (
    <>
      <section className="p-4 border-b-2 border-black lg:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 p-4 min-h-[100vh] gap-8">
          <div className="flex flex-col col-span-2 space-y-5">
            <a
              href="javascript:void(0)"
              className="inline-flex items-center p-1 pr-6 text-xs duration-150 border rounded-full lg:text-sm group w-fit gap-x-6 hover:bg-accent"
            >
              <span className="inline-block px-3 py-1 bg-white border border-black rounded-full">
                Latest News
              </span>
              <p className="flex items-center">
                AptosDAO Grantees
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </p>
            </a>
            <h1 className="max-w-2xl">
              Unlock boundless possibilities of blockchain names
            </h1>
            <p>One Name, Multiple Spaces, Infinite Possibilities</p>
            <div className="flex items-center gap-x-3">
              <button className="px-6 py-4 group">
                Get Started
                <span className="inline-block pl-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </button>
              <a href="javascript:void(0)" className="">
                Contact sales
              </a>
            </div>
          </div>
          <div className="flex flex-col items-end justify-end w-full h-full col-span-2 gap-5">
            <div className="lg:max-w-[30vw] gap-4 grid px-6 p-4 bg-dark min-h-[20vh] rounded-2xl w-full group">
              <h2 className="font-bold text-white">BLOCKCHAIN NAMES</h2>
              <p className="text-gray-400 max-w-[70%] text-sm">
                Cement your place on web3 and start exploring blockchain spaces.
              </p>
              <a className="pt-2 uppercase accent space group-hover:text-white">
                Claim unique names
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </a>
            </div>
            <div className="lg:max-w-[30vw] gap-4 grid px-6 p-4 bg-dark min-h-[20vh] rounded-2xl w-full group">
              <h2 className="font-bold text-white ">BLOCKCHAIN SPACES</h2>
              <p className="text-gray-400 max-w-[70%] text-sm">
                Own your distinct community identities on the blockchain of your
                choice.
              </p>
              <a className="pt-2 uppercase accent space group-hover:text-white">
                Go To Space Factory
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="p-4 border-b-2 border-black lg:p-8">
        <div className="flex flex-col grid-cols-4 gap-8 px-4 py-8 lg:grid">
          <h3 className="col-span-1 text-lg text-center lg:text-left">
            Supported by industry experts at the world’s leading blockchain
            networks
          </h3>
          <div className="flex flex-wrap items-center col-span-3 justify-evenly">
            <h2>IBM</h2>
            <h2>Aptos</h2>
            <h2>Polygon</h2>
            <h2>Zetachain</h2>
            <h2>Filecoin</h2>
            <h2>Ethereum</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
