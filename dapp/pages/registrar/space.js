import { Context } from "@/context";
import { mumbai, polygon } from "@/data/contracts";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import namespaceAbi from "/data/contractABI/namespace.json";

const spaces = () => {
  const [org, setOrg] = useState("Create");
  const [description, setDescription] = useState("");
  const [chain, setChain] = useState("chain");
  const [space, setSpace] = useState("space");
  const [valid, setValid] = useState(false);
  const [visibility, setVisibility] = useState("");
  const [loading, setLoading] = useState(false);
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

  const checkValidity = async () => {
    setLoading(true);
    setValid(false);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (network === "Polygon Mumbai") {
          console.log("checking tokenId...", mumbai.Namespace, org);
          const contract = new ethers.Contract(
            mumbai.Namespace,
            namespaceAbi,
            signer
          );
          const tokenId = await contract.getTokenIds(org);
          console.log("tokenId:", org, tokenId);
          if (tokenId == 0) {
            setValid(true);
          } else {
            setValid("invalid");
          }
        } else if (network === "Polygon Mainnet") {
          console.log("Checking tokenId...", polygon.Namespace, org);
          const contract = new ethers.Contract(
            polygon.Namespace,
            namespaceAbi,
            signer
          );
          const owner = await contract.getSpaceCreator(space);
          console.log("tokenId:", space, String(owner));
          if (String(owner) == "0x0000000000000000000000000000000000000000") {
            setValid(true);
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

  const reset = () => {
    setOrg("Create");
    setChain("chain");
    setChain("space");
    setValid(false);
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
        } else if (network === "Polygon Mainnet") {
          const contract = new ethers.Contract(
            polygon.Namespace,
            namespaceAbi,
            signer
          );
          let tx = await contract.createName(account, space, org, description, "", visibility, {
            value: ethers.utils.parseEther(String(1)),
          });
          const receipt = await tx.wait();
          if (receipt.status === 1) {
            setReceipt(`https://https://polygonscan.com/tx/` + tx.hash);
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
            <li>
              <Link href="/ns/browser">nsBrowser</Link>
            </li>
          </ul>
        </nav>
        <footer className="fixed bottom-0 left-0 z-50 flex items-end justify-center w-full h-48 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <p
            className="flex gap-2 p-8 pointer-events-none place-items-center lg:pointer-events-auto lg:p-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <span className="font-black ">Zoociety</span>
          </p>
        </footer>
      </div>

      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:- after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-fuchsia-300 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-fuchsia-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <p className="text-3xl font-bold lg:text-5xl">
          name.<span className="animate-pulse">{space}</span>
        </p>
        {org && visibility != "Empty" && (
          <p className="mt-4 text-lg font-bold">{org} Space</p>
        )}
        {description && visibility != "Empty" && (
          <p className="max-w-[200px] text-center">{description}</p>
        )}
      </div>

      <div className="grid w-full gap-5 p-5 mb-24 text-center border border-gray-300 rounded-xl lg:p-5 lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            1. Choose Network
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>
          <div className={`m-0 w-full grid text-sm gap-2`}>
            <select
              id="badge-class"
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              className="w-full px-4 py-2"
            >
              <option value="">--Select Blockchain Network--</option>

              <option value="polygon">Polygon Mainnet</option>
              <option value="arbitrum">Arbitrum One</option>
              <option value="cic">CIC Chain</option>
              <option value="arbitrum">Filecoin VM</option>
              <option value="ethereum" disabled={true}>
                Ethereum
              </option>
              <option value="zkevm" disabled={true}>
                Polygon zkEVM
              </option>
              <option value="optimism" disabled={true}>
                Optimism
              </option>
              <option value="optimism" disabled={true}>
                Aptos
              </option>
              <option value="bsc" disabled={true}>
                Binance Smart Chain
              </option>
              <option value="mumbai">Polygon Mumbai</option>
              <option value="hyperspace">Filecoin Hyperspace</option>
            </select>
            <button
              className="w-full px-4 py-2 mt-2 font-bold text-left border hover:bg-black hover:text-white"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            2. Space Visibility
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>

          <select
            id="badge-class"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full px-4 py-2"
          >
            <option value="">--Select visibility--</option>
            <option value="Private">Private Space</option>
            <option value="Public">Public Space</option>
            <option value="Empty">Empty Space</option>
          </select>
          {visibility == "Public" && (
            <p className="w-full m-0 mt-2 text-sm opacity-50">
              <span className="font-bold">{visibility} Space</span> allows
              anyone to connect to your space.
            </p>
          )}
          {visibility == "Private" && (
            <p className="w-full m-0 mt-2 text-sm opacity-50">
              <span className="font-bold">{visibility} Space</span> allows you
              to add, approve or whitelist addresses before they can connect to
              your space.
            </p>
          )}
          {visibility == "Empty" && (
            <p className="w-full m-0 mt-2 text-sm opacity-50">
              <span className="font-bold">{visibility} Space</span> allows you
              to own a space domain then use or sell it afterwards.
            </p>
          )}
        </div>

        <div className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            3. Space Details
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>
          {visibility && visibility != "Empty" && chain && (
            <>
              <input
                onChange={(e) => setOrg(e.target.value)}
                className="z-50 w-full px-4 py-2 font-bold text-left border"
                placeholder="space name"
              />
              <input
                onChange={(e) => setDescription(e.target.value)}
                className="z-50 w-full px-4 py-2 my-2 font-bold text-left border"
                placeholder="space description"
              />
            </>
          )}
          <input
            // disabled={valid}
            onChange={(e) => setSpace(e.target.value)}
            className="w-full px-4 py-2 font-bold text-left border "
            placeholder="space domain or symbol"
          />
          {visibility && visibility != "Empty" && chain && (
            <>
              <p className="w-full mt-2 text-xs text-center">
                upload your logo or banner (preferably squared)
              </p>
              <input
                type="file"
                onChange={(e) => setDescription(e.target.value)}
                className="z-50 w-full px-4 py-2 my-2 font-bold text-left border"
                placeholder="space description"
              />
            </>
          )}
          {(!valid || valid == "invalid") &&
            chain != "chain" &&
            space != "space" && (
              <button
                className="z-50 w-full px-4 py-2 mt-2 font-bold text-left border"
                onClick={checkValidity}
              >
                {loading ? "Checking" : "Check"} Availability
              </button>
            )}
          {space != "name" && (
            <>
              {valid == "invalid" ? (
                <p className={`m-0 p-2 border mt-2 w-full text-sm opacity-50`}>
                  <span className="font-bold ">{space}</span> is not available.
                </p>
              ) : (
                <>
                  {valid && (
                    <p
                      className={`m-0 p-2 border mt-2 w-full text-sm opacity-50`}
                    >
                      <span className="font-bold ">{space}</span> is valid and
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
            4. Mint to Own it{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>
          {chain != "chain" && space != "space" && valid && (
            <>
              <button className="z-50 w-full px-4 py-2 font-bold text-left border hover:bg-black hover:text-white">
                Mint for {chain == "cic" && "1 $CIC"}
                {chain == "polygon" && "1 $MATIC"}
                {chain == "mumbai" && "0.1 $MATIC"}
                {chain == "arbitrum" && "1 $ARB"}
              </button>
              <p className={`m-0 mt-2 w-full text-sm opacity-50`}>
                <span className="font-bold">
                  {name}.{space}
                </span>{" "}
                is now ready to be minted on {chain} blockchain network. Own it
                before it's gone.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default spaces;
