import React from "react";

const Token = () => {
  return (
    <>
      <section
        className="py-8 border-b-2 border-black lg:py-16 group"
        id="token"
      >
        <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-4 lg:p-8 lg:gap-8">
          <div className="flex flex-col mb-8 space-y-4 lg:col-span-4 lg:mb-12">
            <p className="col-span-4 px-4 py-1 font-bold text-white uppercase bg-black rounded-full w-fit group-hover:bg-accent">
              ADVANCED TOKEN DYNAMICS
            </p>
            <h1 className="max-w-3xl">
              Dynamically interacts on blockchain data
            </h1>
          </div>
          <div className="grid min-h-[20vh] gap-4 w-full group content-start rounded-2xl">
            <h3 className="font-bold ">Dynamic Token</h3>
            <p className="text-gray-700">
              Experience fully on-chain dynamic metadata with automated token
              visuals providing a new level of interactivity and customization
              for your digital assets.
            </p>
          </div>
          <div className="grid min-h-[20vh] gap-4 w-full group  content-start rounded-2xl">
            <h3 className="font-bold ">Token Factory</h3>
            <p className="text-gray-700">
              Create your own NFT collection for each space you created. When
              blockchain name and space connect, name.space domain name will be
              minted and added to the Token Collection, showcasing all the
              unique namespaces born on space.
            </p>
          </div>
          <div className="grid min-h-[20vh] gap-4 w-full group  content-start rounded-2xl">
            <h3 className="font-bold ">File Reserve</h3>
            <p className="text-gray-700">
              Store and securely reserve your files on decentralized networks
              (IPFS or blockchains) for community use and map their return
              hashes to human-readable names, ensuring easy file location and
              accessibility.
            </p>
          </div>
          <div className="grid min-h-[20vh] gap-4 w-full group content-start rounded-2xl">
            <h3 className="font-bold ">Messaging System</h3>
            <p className="text-gray-700">
              Enjoy secure and seamless communication within the Namespace
              ecosystem through our built-in messaging system, facilitating
              direct and private conversations between users, fostering
              collaboration and engagement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Token;
