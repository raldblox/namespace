import { Context } from "@/context";
import { mumbai } from "@/data/contracts";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import tokenAbi from "/data/contractABI/token.json";
import namespaceAbi from "/data/contractABI/namespace.json";

const names = () => {
  const {
    connectWallet,
    account,
    namespace,
    switchTestnet,
    switchMainnet,
    switchCicMainnet,
    network,
    distributed,
    allSpaces,
    spaceData,
  } = useContext(Context);
  const [name, setName] = useState("name");
  const [chain, setChain] = useState("chain");
  const [selectedSpace, setSpace] = useState("space");
  const [receipt, setReceipt] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkValidity = async () => {
    setLoading(true);
    setValid(false);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (network === "Polygon Mumbai") {
          console.log("checking tokenId...", mumbai.Namespace, name);
          const contract = new ethers.Contract(
            mumbai.Namespace,
            namespaceAbi,
            signer
          );
          const tokenId = await contract.getTokenIds(name);
          console.log("tokenId:", name, tokenId);
          if (tokenId == 0) {
            setValid(true);
            const allSpaces = await contract.getAllSpaces();
          } else {
            setValid("invalid");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const mint = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (network === "Polygon Mumbai") {
          const contract = new ethers.Contract(
            mumbai.Namespace,
            namespaceAbi,
            signer
          );
          let tx = await contract.createName(name, account, {
            value: ethers.utils.parseEther(String(1)),
          });
          const receipt = await tx.wait();
          if (receipt.status === 1) {
            setReceipt(`https://https://mumbai.polygonscan.com/tx/` + tx.hash);
            alert("Successfully minted.");
          } else {
            alert("Minting failed.");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connect = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (network === "Polygon Mumbai") {
          const contract = new ethers.Contract(
            mumbai.Namespace,
            namespaceAbi,
            signer
          );
          let tx = await contract.connectSpace(name, space, {
            value: ethers.utils.parseEther(String(1)),
          });
          const receipt = await tx.wait();
          if (receipt.status === 1) {
            setReceipt(`https://https://mumbai.polygonscan.com/tx/` + tx.hash);
            alert("Successfully minted.");
          } else {
            alert("Minting failed.");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setName("name");
    setChain("chain");
    setChain("space");
    setValid(false);
  };

  return (
    <main>
      <div className="z-10 items-center justify-between w-full font-mono text-base lg:flex">
        <nav className="fixed top-0 left-0 flex justify-center w-full py-2 border-b border-gray-300 bg-gradient-to-b from-zinc-100 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-100 lg:p-2 lg:dark:bg-zinc-800/30">
          <ul className="flex justify-between w-full">
            <li className="hover:bg-transparent">
              <Link href="/">
                <Image
                  src="/namespace-cube.svg"
                  height={50}
                  width={150}
                  priority
                  className="dark:hidden"
                />
                <Image
                  src="/namespace-cube-wht.svg"
                  height={50}
                  width={150}
                  priority
                  className="hidden dark:flex"
                />
              </Link>
            </li>
            {network && (
              <li>
                <Link href="/network">{network}</Link>
              </li>
            )}
          </ul>
        </nav>
        <footer className="fixed bottom-0 left-0 flex items-end justify-center w-full h-48 gap-3 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <ul>
            <li>
              {account ? (
                <p
                  className="flex gap-2 p-8 pointer-events-none place-items-center lg:pointer-events-auto lg:p-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {account.slice(0, 5)}...{account.slice(-5)}
                </p>
              ) : (
                <button
                  className="flex gap-2 p-8 place-items-center lg:p-2"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </li>
          </ul>
        </footer>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-fuchsia-300 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-fuchsia-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <p className="text-3xl font-bold lg:text-5xl">
          <span className="animate-pulse">{name}</span>
          {selectedSpace != "none" && <>.{selectedSpace}</>}
        </p>
      </div>

      <div className="grid w-full gap-2 p-2 mb-24 text-center border border-gray-300 rounded-xl lg:p-2 lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            1. Choose Network
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>
          <div className={`m-0 w-full grid text-sm gap-2`}>
            <select
              disabled={name != "name"}
              id="badge-class"
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              className="w-full px-4 py-2"
            >
              <option value="">--Select Blockchain Network--</option>
              <option value="ethereum">Ethereum Mainnet</option>
              <option value="cic">CIC Chain Mainnet</option>
              <option value="mumbai">Polygon Mumbai</option>
              <option value="polygon">Polygon Mainnet</option>
              <option value="arbitrum">Arbitrum One</option>
              <option value="zkevm" disabled={true}>
                Polygon zkEVM
              </option>
              <option value="optimism" disabled={true}>
                Optimism
              </option>
              <option value="bsc" disabled={true}>
                Binance Smart Chain
              </option>
            </select>
          </div>
          <button
            className="z-50 w-full px-4 py-2 mt-2 font-bold text-left border hover:bg-black hover:text-white"
            onClick={reset}
          >
            Reset
          </button>
        </div>

        <div className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            2. Create Name
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>
          <input
            disabled={chain == ("chain" || "") || (valid && valid != "invalid")}
            onChange={(e) => setName(e.target.value)}
            className="z-50 w-full px-4 py-2 font-bold text-left border"
            placeholder="insert name"
          />
          {name != "name" && valid && (
            <button
              className="z-50 w-full px-4 py-2 mt-2 font-bold text-left border hover:bg-black hover:text-white"
              onClick={mint}
            >
              Mint for {chain == "cic" && "1 $CIC"}
              {chain == "polygon" && "1 $MATIC"}
              {chain == "mumbai" && "1 $MATIC"}
              {chain == "arbitrum" && "1 $ARB"}
              {chain == "ethereum" && "0.01 $ETH"}
            </button>
          )}
          {(!valid || valid == "invalid") &&
            chain != "chain" &&
            name != "name" && (
              <button
                disabled={!name}
                className="z-50 w-full px-4 py-2 mt-2 font-bold text-left border"
                onClick={checkValidity}
              >
                {loading ? "Checking" : "Check"} Name Availability
              </button>
            )}
          {name != "name" && (
            <>
              {valid == "invalid" ? (
                <p className={`m-0 p-2 border mt-2 w-full text-sm opacity-50`}>
                  <span className="font-bold ">{name}</span> is not available.
                </p>
              ) : (
                <>
                  {valid && (
                    <p
                      className={`m-0 p-2 border mt-2 w-full text-sm opacity-50`}
                    >
                      <span className="font-bold ">{name}</span> is valid and
                      available.
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <div className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            3. Choose Space
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>

          {allSpaces && (
            <select
              disabled={!valid || valid == "invalid"}
              id="badge-class"
              value={selectedSpace}
              onChange={(e) => setSpace(e.target.value)}
              className="w-full px-4 py-2 text-sm"
            >
              {" "}
              <option value="">--Select your space--</option>
              <option value="none">I will join spaces later.</option>
              {spaceData.map((space, index) => {
                return (
                  <option value={space.tld} key={index}>
                    <span className="font-bold">
                      .{space.tld} | {space.member.length} space member/s
                    </span>{" "}
                    | {space.info}
                  </option>
                );
              })}
            </select>
          )}

          {selectedSpace != "space" && (
            <>
              <img
                src={
                  spaceData.find((space) => space.tld === selectedSpace)?.image
                }
                alt="Selected space"
                className="my-2"
              />
              <p
                className={`my-2 text-2xl font-semibold w-full text-center uppercase`}
              >
                {spaceData.find((space) => space.tld === selectedSpace)?.name}{" "}
              </p>
              <p className={`text-base w-full text-center`}>
                {spaceData.find((space) => space.tld === selectedSpace)?.info}
              </p>
              {/* <p className={`my-2 text-base w-full text-center`}>
                FEE:{" "}
                {ethers.utils
                  .formatEther(
                    spaceData.find((space) => space.tld === selectedSpace)?.fee
                  )
                  .slice(0, 5)}{" "}
                {chain == "polygon" && "$MATIC"}
                {chain == "mumbai" && "$MATIC"}
                {chain == "arbitrum" && "$ARB"}
                {chain == "ethereum" && "$ETH"}
              </p> */}
            </>
          )}

          {valid && selectedSpace != "none" && (
            <p className="w-full p-2 border m-0 text-sm opacity-50">
              {selectedSpace == "space" && (
                <>
                  Connect your <span className="font-bold">{name}</span> to some
                  spaces to create a namespace.{" "}
                </>
              )}
              You can manage your names and spaces later.
            </p>
          )}
        </div>
        <div className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            4. Connect Space{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>
          {chain != "chain" &&
            name != "name" &&
            selectedSpace != "space" &&
            valid && (
              <>
                <button
                  className="z-50 w-full px-4 py-2 font-bold text-left border hover:bg-black hover:text-white"
                  onClick={connect}
                >
                  Connect for {chain == "cic" && "1 $CIC"}
                  {chain == "polygon" && "1 $MATIC"}
                  {chain == "mumbai" && "1 $MATIC"}
                  {chain == "arbitrum" && "1 $ARB"}
                  {chain == "ethereum" && "0.01 $ETH"}
                </button>
                <p className={`m-0 p-2 border mt-2 w-full text-sm opacity-50`}>
                  Your <span className="font-bold">{name}</span> name is now
                  ready to connect{" "}
                  {selectedSpace != "none" && (
                    <>
                      on{" "}
                      <span className="font-bold">{selectedSpace} space</span>
                    </>
                  )}{" "}
                  on {chain} blockchain network.
                </p>
              </>
            )}
        </div>
      </div>
    </main>
  );
};

export default names;
