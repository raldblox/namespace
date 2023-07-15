import React from "react";

const Highlight = () => {
  return (
    <>
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col col-span-2 px-8 py-8 space-y-5 border-r-2 border-black lg:px-12">
            <h1 className="max-w-2xl font-bold ">
              Empowering Identity and Impact Across Chains
            </h1>
            <p className="text-gray-600">
              Enabling secure asset and data transfers between different chains,
              harnessing the unique features of various blockchains while
              preserving distinct identities.
            </p>
          </div>
          <div className="flex flex-col items-start justify-start w-full h-full col-span-2 gap-5">
            <div className="grid px-12 py-8 min-h-[20vh] w-full group border-b-2 border-black gap-4">
              <h2 className="px-4 py-2 rounded-2xl bg-dark w-fit group-hover:bg-accent">
                O1
              </h2>
              <h2 className="font-bold ">Claim Your Unique Name</h2>
              <p className="text-gray-700 lg:max-w-[75%]">
                Secure your own unique name within the Namespace ecosystem,
                allowing you to establish your distinct digital identity in the
                web3 world.
              </p>
            </div>
            <div className="grid p-8 min-h-[20vh] w-full group border-b-2 border-black gap-4">
              <h2 className="px-4 py-2 rounded-2xl bg-dark w-fit group-hover:bg-accent">
                O2
              </h2>
              <h2 className="font-bold ">Connect to Blockchain Spaces</h2>
              <p className="text-gray-700 lg:max-w-[75%]">
                Create and connect to multiple blockchain spaces within your
                Namespace, enabling you to engage with different communities,
                projects, and networks across the decentralized landscape.
              </p>
            </div>
            <div className="grid p-8 min-h-[20vh] w-full group gap-4 group">
              <h2 className="px-4 py-2 rounded-2xl bg-dark w-fit group-hover:bg-accent">
                O3
              </h2>
              <h2 className="font-bold ">Customize and Create Contents</h2>
              <p className="text-gray-700 lg:max-w-[75%]">
                Customize your profile, create engaging content, upload files,
                add records, and explore the diverse array of contents available
                within Namespace, empowering you to showcase your contributions,
                share knowledge, and foster meaningful interactions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Highlight;
