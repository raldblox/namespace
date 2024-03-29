"use client";

import { createContext, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import "@fontsource/ibm-plex-mono";
import "@fontsource/poppins";
import "./globals.css";
import Footer from "@/components/sections/Footer";

import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { ChainNetwork } from "@/libraries/Networks";

const wallets = [new PetraWallet()];

export const Context = createContext();

export const ContextProvider = (props) => {
  const [evmAccount, setEvmAccount] = useState("");
  const [network, setNetwork] = useState("");

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Please install Web3 Wallet like Metamask.");
        return;
      } else {
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setEvmAccount(accounts[0].toLowerCase());
    } catch (error) {
      console.log(error);
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
      setEvmAccount(account.toLowerCase());
    } else {
      console.log("No authorized account found");
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });

    if (ChainNetwork) {
      return;
    }

    if (ChainNetwork[chainId]) {
      setNetwork(ChainNetwork[chainId].params[0]);
    } else {
      console.log("Network not found in ChainNetwork");
    }

    ethereum.on("chainChanged", handleChainChanged);

    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const value = {
    evmAccount,
    setEvmAccount,
    connectWallet,
    network,
    setNetwork,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect={true}
            onError={(error) => {
              console.log("error", error);
            }}
          >
            <Navigation />
            {children}
            <Footer />
          </AptosWalletAdapterProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
