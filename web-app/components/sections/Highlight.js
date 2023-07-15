import React from "react";

const Highlight = () => {
  return (
    <>
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-4 ">
          <div className="flex flex-col col-span-2 px-12 py-8 space-y-5 border-r-2 border-black">
            <h1 className="text-[3rem] leading-[4.5rem] font-bold max-w-2xl">
              Empowering Identity and Impact Across Chains
            </h1>
            {/* <div className="flex items-center gap-x-3">
              <button className="px-6 py-4 group">
                Connect to Spaces
                <span className="inline-block pl-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </button>
            </div> */}
          </div>
          <div className="flex flex-col items-start justify-start w-full h-full col-span-2 gap-5">
            <div className="grid p-8 min-h-[20vh] w-full group border-b-2 border-black">
              <h2 className="font-bold ">
                Create Visibilities for Communities
              </h2>
              <p className="text-gray-700 max-w-[70%]">
                Create your crosschain blockchain idendity
              </p>
            </div>
            <div className="grid p-8 min-h-[20vh] w-full group border-b-2 border-black">
              <h2 className="font-bold ">Add Exclusivity and Sustainability</h2>
              <p className="text-gray-700 max-w-[70%]">
                Create your crosschain blockchain idendity
              </p>
            </div>
            <div className="grid p-8 min-h-[20vh] w-full group border-b-2 border-black">
              <h2 className="font-bold ">Showcase Multiple Web3 Journey</h2>
              <p className="text-gray-700 max-w-[70%]">
                Create your crosschain blockchain idendity
              </p>
            </div>
            <div className="grid p-8 min-h-[20vh] w-full group">
              <h2 className="font-bold">
                Seamless Cross-Chain Interoperability
              </h2>
              <p className="text-gray-700 max-w-[70%]">
                Create your crosschain blockchain idendity
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Highlight;
