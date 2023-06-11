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
  const [allNames, setAllNames] = useState([]);

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
    } else {
      console.log("No authorized account found");
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Chain ID:", chainId, networks[chainId]);
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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

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
    switchMumbai,
    distributed,
    switchCicMainnet,
    allSpaces,
    setAllSpaces,
    allNames,
    checkIfWalletIsConnected,
    spaceData
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
