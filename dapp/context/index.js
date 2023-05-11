import { cic, mumbai, polygon } from "@/data/contracts";
import { networks } from "@/data/networks";
import React, { createContext, useEffect, useState } from "react";
import tokenAbi from "/data/contractABI/token.json";
import namespaceAbi from "/data/contractABI/namespace.json";
import { ethers } from "ethers";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [page, setPage] = useState("");
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");
  const [namespace, setNamespace] = useState("");
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [balanceEth, setBalanceEth] = useState("");
  const [distributed, setDistributed] = useState("");
  const [spaceData, setSpaceData] = useState([]);
  const [allSpaces, setAllSpaces] = useState([]);

  const connectWallet = async () => {
    setConnected(false);
    setConnecting(true);
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install Web3 Wallet like Metamask.");
        return;
      } else {
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setAccount(accounts[0].toLowerCase());
      setConnecting(false);
      setConnected(true);
    } catch (error) {
      console.log(error);
      setConnecting(false);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Connected account:", account);
      setAccount(account.toLowerCase());
      setConnected(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balanceWei = await provider.getBalance(account);
      const balance = ethers.utils.formatEther(balanceWei);
      setBalanceEth(balance);
    } else {
      console.log("No authorized account found");
    }
    const chainId = await ethereum.request({ method: "eth_chainId" });
    setNetwork(networks[chainId]);
    ethereum.on("chainChanged", handleChainChanged);
    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };

  const switchPolygon = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x89",
                  chainName: "Matic Mainnet",
                  rpcUrls: ["https://polygon-rpc.com/"],
                  nativeCurrency: {
                    name: "Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  const switchArbitrum = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xa4b1" }], // Arbitrum One chain ID
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0xa4b1", // Arbitrum One chain ID
                  chainName: "Arbitrum One",
                  rpcUrls: ["https://arb1.arbitrum.io/rpc"],
                  nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://arbiscan.io/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  const switchCicMainnet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x549" }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x549",
                  chainName: "CIC Chain Mainnet",
                  rpcUrls: ["https://xapi.cicscan.com"],
                  nativeCurrency: {
                    name: "Matic",
                    symbol: "CIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://cicscan.com"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  const switchMumbai = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                  nativeCurrency: {
                    name: "Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  const getNamespace = async () => {
    if (!account) {
      checkIfWalletIsConnected();
      return;
    }
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log("Namespace Network:", network);
        let namelink;
        if (network == "CIC Chain Mainnet") {
          console.log("checking namespace..");
          const contract = new ethers.Contract(
            cic.Namespace, // "contract addresss"
            namespaceAbi,
            signer
          );
          namelink = await contract.getNamespace(account);
          setNamespace(namelink);
        }
        if (network == "Polygon Mainnet") {
          const contract = new ethers.Contract(
            polygon.Namespace,
            namespaceAbi,
            signer
          );
          const primary = await contract.resolveAddress(account);
          setNamespace(primary);
          const spaces = await contract.getAllSpaces();
          setAllSpaces(spaces);
          const spaceData = await Promise.all(
            spaces.map(async (space) => {
              const tld = space;
              const member = (await contract.getSpaceNames(space)).length;
              const tokenId = await contract.getTokenIds(space);
              const info = await contract.getSpaceInfo(space);
              const name = await contract.getSpaceOrgname(space);
              const fee = await contract.getSpaceMembershipFee(space);
              const image = await contract.getSpaceBanner(space);
              return { tld, member, tokenId, info, fee, name, image };
            })
          );
          console.log("Spaces data:", spaceData);
          setSpaceData(spaceData);
        }
        if (network == "Polygon Mumbai") {
          console.log("getting all spaces..");
          const contract = new ethers.Contract(
            mumbai.Namespace,
            namespaceAbi,
            signer
          );
          const primary = await contract.resolveAddress(account);
          setNamespace(primary);
          const spaces = await contract.getAllSpaces();
          setAllSpaces(spaces);
          const spaceData = await Promise.all(
            spaces.map(async (space) => {
              const tld = space;
              const member = await contract.getSpaceNames(space);
              const tokenId = await contract.getTokenIds(space);
              const info = await contract.getSpaceInfo(space);
              const name = await contract.getSpaceOrgname(space);
              const fee = await contract.getSpaceMembershipFee(space);
              const image = await contract.getSpaceBanner(space);
              return { tld, member, tokenId, info, fee, name, image };
            })
          );
          console.log("space data:", spaceData);
          setSpaceData(spaceData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserStats = async () => {
    if (!account) {
      checkIfWalletIsConnected();
      return;
    }
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (network === "CIC Chain Mainnet") {
          const contract = new ethers.Contract(cic.Tokenizer, tokenAbi, signer);
          const distributed = await contract.viewDistributedTokens(account);
          const tokensArray = distributed.map((d) => d.toNumber());
          const tokenData = await Promise.all(
            tokensArray.map(async (tokenId) => {
              const owner = await contract.ownerOf(tokenId);
              const balance = await contract.viewBalance(tokenId);
              const namespace = await contract.viewNamespace(owner);
              const image = await contract.generateImage(tokenId);
              return { tokenId, owner, balance, namespace, image };
            })
          );
          console.log("pace data:", tokenData);
          setSpaceData(tokenData);
        } else if (network === "Polygon Mainnet") {
          const contract = new ethers.Contract(polygon.Tokenizer, tokenAbi, signer);
          const distributed = await contract.viewDistributedTokens(account);
          const tokensArray = distributed.map((d) => d.toNumber());

          const tokenData = await Promise.all(
            tokensArray.map(async (tokenId) => {
              const owner = await contract.ownerOf(tokenId);
              const balance = await contract.viewBalance(tokenId);
              const namespace = await contract.viewNamespace(owner);
              const image = await contract.generateImage(tokenId);
              return { tokenId, owner, balance, namespace, image };
            })
          );
          console.log("space data:", tokenData);
          setSpaceData(tokenData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (account) {
      // getUserStats();
    }
    if (network) {
      getNamespace();
    }
  }, [account, network]);

  const value = {
    page,
    setPage,
    balanceEth,
    setBalanceEth,
    switchArbitrum,
    account,
    setAccount,
    switchPolygon,
    connectWallet,
    network,
    setNetwork,
    connected,
    setConnected,
    namespace,
    setNamespace,
    getNamespace,
    switchMumbai,
    distributed,
    switchCicMainnet,
    spaceData,
    allSpaces,
    setAllSpaces,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
