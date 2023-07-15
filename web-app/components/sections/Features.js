import React from "react";

const Features = () => {
  return (
    <>
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-3 gap-8 p-12">
          <div className="flex flex-col col-span-3 py-8 space-y-5">
            <p className="col-span-4 px-4 py-1 text-white uppercase bg-black rounded-full w-fit">
              Why Namespace
            </p>
            <h1 className="max-w-xl">Unlock the Power of Namespace to:</h1>
          </div>
          <div className="grid min-h-[20vh] gap-4 w-full group p-8 border-2 border-black rounded-2xl">
            <h3 className="font-bold ">Establish Unique Identities</h3>
            <p className="text-gray-700">
              Claim distinctive domain names and custom namespaces, enabling
              individuals and communities to establish their own digital
              presence with recognition and visibility in the web3 ecosystem.
            </p>
          </div>
          <div className="grid min-h-[20vh] gap-4 w-full group p-8 border-2 border-black rounded-2xl">
            <h3 className="font-bold ">Foster Community Engagement</h3>
            <p className="text-gray-700">
              Curate exclusive content, create private blockchain spaces, and
              implement membership features, empowering organizations to engage
              and nurture their community members for sustainable growth and
              collaboration.
            </p>
          </div>
          <div className="grid min-h-[20vh] gap-4 w-full group p-8 border-2 border-black rounded-2xl">
            <h3 className="font-bold ">Showcase Your Web3 Journey</h3>
            <p className="text-gray-700">
              Visually represent your involvement in multiple projects
              simultaneously through NFT visuals, showcasing your diverse
              interests and contributions within the web3 community and sparking
              connections with like-minded individuals.
            </p>
          </div>
          <div className="grid min-h-[20vh] gap-4 w-full group p-8 border-2 border-black rounded-2xl">
            <h3 className="font-bold ">Craft Holistic Web3 Profiles</h3>
            <p className="text-gray-700">
              Go beyond basic information and share captivating content, files,
              and links using emerging technologies like blockchain, AI, and
              quantum systems, providing users with a comprehensive and
              immersive web3 profile experience.
            </p>
          </div>
          <div className="grid min-h-[20vh] gap-4 w-full group p-8 border-2 border-black rounded-2xl">
            <h3 className="font-bold ">Embrace Decentralized Networks</h3>
            <p className="text-gray-700">
              Access and share content across decentralized networks (IPFS and
              Blockchain), maintaining your distinct digital identity while
              leveraging the benefits of distributed, resilient storage and
              eliminating the need for a central authority.
            </p>
          </div>
          <div className="grid min-h-[20vh] gap-4 w-full group p-8 border-2 border-black rounded-2xl">
            <h3 className="font-bold ">
              Seamless Cross-Chain Interoperability
            </h3>
            <p className="text-gray-700">
              Navigate and interact with multiple blockchain networks
              seamlessly, leveraging Namespace's integration with ZetaChain to
              unlock a new era of cross-chain interoperability, connectivity,
              and enhanced web3 experiences.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
