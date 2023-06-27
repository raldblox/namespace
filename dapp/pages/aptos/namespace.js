import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const namespace = () => {
  const [withPetra, setWithPetra] = useState(false);
  const [petraWallet, setPetraWallet] = useState(false);
  const {
    connect,
    account,
    network,
    connected,
    disconnect,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
  } = useWallet();

  const getAptosWallet = () => {
    if ("aptos" in window) {
      console.log(window.aptos);
      return window.aptos;
    } else {
      window.open("https://petra.app/", `_blank`);
    }
  };

  const connectWallet = async () => {
    const wallet = getAptosWallet();
    try {
      const account = await wallet.account();
      console.log(account); // { address: string, address: string }
      setPetraWallet(account.address);
    } catch (error) {
      // { code: 4001, message: "User rejected the request."}
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>{account?.address}</div>
      <div>{network?.name}</div>
      <div>{wallet?.name}</div>
      <img src={wallet?.icon} />
      <button onClick={disconnect}>Disconnect</button>
      <WalletSelector />
    </div>
  );
};

export default namespace;
