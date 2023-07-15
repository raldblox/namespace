import React from "react";

const Landing = () => {
  return (
    <>
      <section className="p-8 border-b-2 border-black">
        <div className="grid grid-cols-4 p-4 min-h-[100vh]">
          <div className="flex flex-col col-span-2 space-y-5">
            <a
              href="javascript:void(0)"
              className="inline-flex items-center p-1 pr-6 duration-150 border rounded-full group w-fit gap-x-6 hover:bg-accent"
            >
              <span className="inline-block px-3 py-1 bg-white border border-black rounded-full">
                Latest News
              </span>
              <p className="flex items-center">
                Read the launch post from here
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </p>
            </a>
            <h1 className="text-[4rem] leading-[4.5rem] font-bold max-w-2xl">
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
            <div className="max-w-[30vw] grid px-6 p-4 bg-dark min-h-[20vh] rounded-2xl w-full group">
              <h2 className="font-bold text-white">BLOCKCHAIN NAMES</h2>
              <p className="text-gray-400 max-w-[70%]">
                Create your crosschain blockchain idendity
              </p>
              <a className="pt-6 uppercase accent space group-hover:text-white">
                Create your idendity
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </a>
            </div>
            <div className="max-w-[30vw] grid px-6 p-4 bg-dark min-h-[20vh] rounded-2xl w-full group">
              <h2 className="font-bold text-white ">BLOCKCHAIN SPACES</h2>
              <p className="text-gray-400 max-w-[70%]">hehehehehe</p>
              <a className="pt-6 uppercase accent space group-hover:text-white">
                Create space
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="p-8 border-b-2 border-black">
        <div className="grid grid-cols-4 px-4 py-8">
          <h3 className="col-span-1 text-lg">
            Trusted by experts at the world’s leading blockchain companies
          </h3>
          <div className="flex col-span-3 justify-evenly">
            <h1>hello</h1>
            <h1>hello</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
