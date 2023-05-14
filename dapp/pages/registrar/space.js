import { Context } from "@/context";
import { mumbai, polygon } from "@/data/contracts";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import namespaceAbi from "/data/contractABI/namespace.json";
import SwitchNetwork from "@/components/SwitchNetwork";

const spaces = () => {
  const [org, setOrg] = useState("");
  const [description, setDescription] = useState("");
  const [chain, setChain] = useState("chain");
  const [space, setSpace] = useState("");
  const [valid, setValid] = useState(false);
  const [visibility, setVisibility] = useState("");
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [file, setFile] = useState("");
  const [ipfs, setMetaDataURl] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

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
          console.log("tokenId:", String(owner));
          if (String(owner) == "0x0000000000000000000000000000000000000000") {
            setValid(true);
          } else {
            setValid("invalid");
            setTimeout(() => {
              setValid(false);
              setSpace("");
            }, 5000);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const reset = () => {
    setOrg("");
    setSpace("");
    setChain("chain");
    setValid(false);
    setVisibility("")
  };

  const mint = async () => {
    setMinting(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (network === "Polygon Mumbai") {
          const contract = new ethers.Contract(polygon.Namespace, namespaceAbi, signer);
          const isPrivate = visibility === "private";
          const isPublic = visibility === "public";

          let tx;
          if (isPrivate || isPublic) {
            tx = await contract.createName(account, space, org, description, "https://namespace.zoociety.org/assets/namespace.png", true, {
              value: ethers.utils.parseEther(String(1)),
            });
          } else {
            tx = await contract.createName(account, space, "", "", "https://namespace.zoociety.org/assets/namespace.png", false, {
              value: ethers.utils.parseEther(String(1)),
            });
          }

          const receipt = await tx.wait();
          if (receipt.status === 1) {
            setReceipt(`https://mumbai.polygonscan.com/tx/${tx.hash}`);
          } else {
            alert("Minting failed.");
          }
        } else if (network === "Polygon Mainnet") {
          const contract = new ethers.Contract(polygon.Namespace, namespaceAbi, signer);
          const isPrivate = visibility === "private";
          const isPublic = visibility === "public";

          let tx;
          if (isPublic) {
            tx = await contract.createSpace(account, space, org, description, " ", false, {
              value: ethers.utils.parseEther(String(1)),
            });
          } else if (isPrivate) {
            tx = await contract.createSpace(account, space, org, description, " ", true, {
              value: ethers.utils.parseEther(String(1)),
            });
          } {
            tx = await contract.createSpace(account, space, " ", " ", " ", true, {
              value: ethers.utils.parseEther(String(1)),
            });
          }

          const receipt = await tx.wait();
          if (receipt.status === 1) {
            setReceipt(`https://polygonscan.com/tx/${tx.hash}`);
          } else {
            alert("Minting failed.");
          }


        }
        setMinting(false);
      }
    } catch (error) {
      console.log(error);
      setMinting(false);
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    setUploaded(false);
  };

  const uploadFile = async () => {
    setUploaded(false);
    setUploading(true);
    try {
      const nftstorage = new NFTStorage({
        token:
          process.env.NFTSTORAGE,
      });

      const store = await nftstorage.store({
        name: "Uploaded at Zoociety",
        description: "zoociety.org",
        image: file,
      });
      setUploading(false);
      setUploaded(true);
      const ipfsurl = await cleanupIPFS(store.data.image.href);
      setMetaDataURl(getIPFSGatewayURL(store.data.image.href));
      return ipfsurl;
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const cleanupIPFS = (url) => {
    if (url.includes("ipfs://")) {
      return url.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    let urlArray = ipfsURL.split("/");
    let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
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
        <footer className="fixed bottom-0 left-0 flex items-end justify-center w-full h-48 gap-3 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
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

        </footer>
      </div>

      <div className="relative flex flex-col place-items-center">
        <p className="text-3xl font-bold lg:text-5xl">
          name.<span className="animate-pulse">{space ? <>{space}</> : "space"}</span>
        </p>
        {/* {org && visibility != "empty" && (
          <p className="mt-4 text-lg font-bold">{org} Space</p>
        )}
        {description && visibility != "empty" && (
          <p className="max-w-[200px] text-center">{description}</p>
        )} */}
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
              <option value="Polygon Mainnet">Polygon Mainnet</option>
              <option value="Arbitrum One" disabled={true}>Arbitrum One</option>
              <option value="CIC Chain" disabled={true}>CIC Chain Mainnet</option>
              <option value="Filecoin VM" disabled={true}>Filecoin VM Mainnet</option>
              <option value="CIC Chain" disabled={true}>CIC Chain Mainnet</option>
              <option value="ethereum" disabled={true}>
                Ethereum
              </option>
              <option value="Optimism" disabled={true}>
                Optimism
              </option>
              <option value="Aptos" disabled={true}>
                Aptos Blockchain
              </option>
              <option value="Binance" disabled={true}>
                Binance Smart Chain
              </option>
              <option value="Polygon Mumbai" disabled={true}>Polygon Mumbai Testnet</option>
              <option value="Filecoin Hyperspace" disabled={true}>Filecoin Hyperspace</option>
              <option value="Polygon zkEVM" disabled={true}>Polygon zkEVM Testnet</option>
            </select>
            <SwitchNetwork chain={chain} />
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
            <option value="private">Private Space</option>
            <option value="public">Public Space</option>
            <option value="empty">Empty Space</option>
          </select>
          {visibility == "public" && (
            <p className="w-full m-0 mt-2 text-sm opacity-50">
              <span className="font-bold uppercase">{visibility} space</span> allows
              anyone around the world to connect to your space.
            </p>
          )}
          {visibility == "private" && (
            <p className="w-full m-0 mt-2 text-sm opacity-50">
              <span className="font-bold uppercase">{visibility} Space</span> allows you
              to whitelist addresses before they can connect to
              your space.
            </p>
          )}
          {visibility == "empty" && (
            <p className="w-full m-0 mt-2 text-sm opacity-50">
              <span className="font-bold uppercase">{visibility} Space</span> allows you
              to take ownership of space domain then use or sell it afterwards.
            </p>
          )}
        </div>

        <div className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            3. Space Details
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>
          {visibility && visibility != "empty" && chain && (
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
            value={space}
            disabled={valid == "invalid" || valid}
            onChange={(e) => setSpace(e.target.value)}
            className="w-full px-4 py-2 font-bold text-left border "
            placeholder="space domain or symbol"
          />
          {/* {visibility && visibility != "empty" && chain && (
            <>
              <p className="w-full mt-2 text-xs text-center">
                upload your logo or banner (preferably squared)
              </p>
              <input
                type="file"
                // onChange={(e) => setDescription(e.target.value)}
                className="z-50 w-full px-4 py-2 my-2 font-bold text-left border"
                placeholder="space description"
              />
            </>
          )} */}

          {space != "" && (
            <button
              className="z-50 w-full px-4 py-2 mt-2 font-bold text-left border"
              onClick={checkValidity}
            >
              {loading ? "Checking" : "Check"} Space Availability
            </button>
          )}

          {space != "" && valid == "invalid" ? (
            <p className={`p-2 px-4 border mt-2 w-full text-sm bg-red-200 dark:text-black `}>
              <span className="font-bold ">{space}</span> is taken and unavailable.
            </p>
          ) : (
            <>
              {valid && (
                <p
                  className={`p-2 px-4 border mt-2 w-full text-sm bg-green-200 dark:text-black `}
                >
                  <span className="font-bold">.{space}</span> is valid and can be your community or organization identity!
                </p>
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
              <button className="z-50 w-full px-4 py-2 font-bold text-left border hover:bg-black hover:text-white" onClick={mint}>
                Mint for .{space} {chain == "CIC Chain Mainnet" && "1 $CIC"}
                {chain == "Polygon Mainnet" && "1 $MATIC"}
                {chain == "Polygon Mumbai" && "0.1 $MATIC"}
                {chain == "Arbitrum One" && "1 $ARB"}
              </button>
              <p className={`m-0 mt-2 w-full text-sm opacity-50`}>
                Mint your <span className="font-bold">
                  .{space}
                </span> on the {chain} blockchain network and secure its ownership before it's too late. With the option to assign membership fees for each space, you can curate exclusive content and access files for members who share the same values and interests with yours.
              </p>
            </>
          )}
          {minting && <p
            className={`p-2 px-4 border my-2 w-full text-sm bg-orange-200 dark:text-black `}
          >
            Please confirm transaction in your wallet app and wait a bit for its hash. If you’d like to cancel this operation, please decline it in your wallet app.
          </p>}
          {receipt &&
            <a
              href={receipt}
              target="_blank"
            >
              <button
                className="z-50 w-full px-4 py-2 mt-2 font-bold text-center bg-blue-200 border dark:text-black hover:bg-black hover:text-white"
                onClick={mint}
              >
                SUCCESS! VERIFY MINT TRANSACTION
              </button>
            </a>}
        </div>
      </div>
    </main>
  );
};

export default spaces;
