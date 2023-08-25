"use client"

import NameCard from '@/components/cards/NameCard';
import NamespaceCard from '@/components/cards/NamespaceCard';
import SpaceCard from '@/components/cards/SpaceCard';
import Typing from '@/components/effects/Typing'
import { contractAddresses } from '@/libraries/ContractAddresses'
import nsRegistryABI from "@/libraries/NamespaceRegistryABI.json";
import { ethers } from 'ethers'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

// const ethers = require("ethers")

const page = () => {

  const [spaceTld, setSpaceTld] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [spaceDesc, setSpaceDesc] = useState("");
  const [provider, setProvider] = useState(null);
  const [registry, setRegistry] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          console.log("Provider set.");

          // OP-GOERLI
          const nsRegistry = new ethers.Contract(contractAddresses.polygon.mumbai.namespaceRegistry, nsRegistryABI, provider.getSigner());
          setRegistry(nsRegistry);
          console.log("Registry instance set.");

        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Please install MetaMask.");
      }
    };

    initProvider();
  }, [registry]);

  const register = async () => {
    try {
      if (provider && registry && spaceTld && spaceDesc) {
        const signer = provider.getSigner();
        const walletAddress = await signer.getAddress();
        const transaction = await registry.registerSpace(walletAddress, spaceTld, spaceDesc);
        await transaction.wait();
        console.log("Space created successfully");
        alert("Space created successfully")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='grid items-start justify-start min-h-[90vh] grid-cols-1 lg:grid-cols-2 gap-8 py-4 lg:py-8'>
      <div className='grid col-span-1 gap-8 px-4 lg:grid-cols-3 lg:px-8 lg:py-8'>
        <a
          href="https://dorahacks.io/aptos/round-3/buidl"
          target="_blank"
          className="inline-flex items-center col-span-3 p-1 pr-6 text-xs duration-150 border rounded-full lg:text-sm group w-fit gap-x-6 hover:bg-accent"
        >
          <span className="inline-block px-3 py-1 bg-white border border-black rounded-full">
            DISCOVER
          </span>
          <p className="flex items-center">
            Blockchain Space Features
            <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              &gt;
            </span>
          </p>
        </a>
        <h1 className='col-span-3 text-left'>Create Blockchain Space for your <br /> {" "}
          <span className='px-2 text-3xl uppercase scale-75 rounded-md shadow-md lg:text-5xl space bg-accent'>
            <Typing toRotate={["community", "brand", "project", "event", "application", "organization", "networks", "family"]} />
          </span>
        </h1>
        <div className="flex flex-col w-full col-span-3 gap-4">
          <div className='flex gap-4'>
            <input
              value={spaceTld}
              onChange={(e) => setSpaceTld(e.target.value)}
              // disabled={true}
              placeholder="Space TLD"
              className="w-full px-4 py-2 text-xl font-semibold bg-gray-200"
            />
            <input
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              disabled={!spaceTld}
              placeholder="Space Name"
              className="w-full px-4 py-2 text-xl font-semibold bg-gray-200"
            />
          </div>
          <input
            value={spaceDesc}
            onChange={(e) => setSpaceDesc(e.target.value)}
            disabled={!spaceTld}
            placeholder="Space Description"
            className="w-full px-4 py-2 text-xl font-semibold bg-gray-200"
          />
          <button onClick={register} className="p-4 uppercase bg-accent hover:backdrop-blur-sm rounded-2xl focus:shadow-none">
            Register
          </button>
        </div>

        {spaceTld &&
          <div className='grid grid-cols-3 col-span-3 gap-4 '>
            {spaceName &&
              <div className='grid grid-cols-2 col-span-2 border border-black shadow-sm rounded-2xl backdrop-blur-sm'>
                <div className='grid col-span-1 p-4'>
                  <p className='text-lg font-bold'>{spaceName}<br />Namespace<br />Service</p>
                  {spaceDesc && <p>About: {spaceDesc}</p>}
                </div>
                <div className='col-span-1 p-4'>
                  <NamespaceCard chain="ETHEREUM" spaceTld={spaceTld} name="admin" tokenId="0" />
                </div>
                <p className='col-span-2 px-4 py-2 text-xs font-thin text-justify opacity-80'>Note: The "admin.{spaceTld}" token is the first namespace token to be minted in ${spaceName} Namespace Service. It is binded to its creator and is non-transferable.</p>
              </div>}
            <div className='col-span-1 p-4 border border-black shadow-sm rounded-2xl backdrop-blur-sm'>
              <SpaceCard chain="ETHEREUM" spaceTld={`.${spaceTld}`} spaceName={spaceName} spaceDesc={spaceDesc} />
              <p className='mt-2 text-xs font-thin text-justify opacity-80'>Note: This is a Space Token that can be traded and represents ownership of the admin access to its corresponding Namespace Service NFT Collection.</p>
            </div>
          </div>
        }

      </div >
      <div className="grid px-4 transition-transform duration-500 lg:px-8 content-end w-full h-full grid-cols-2 col-span-1 py-8 gap-4 lg:grid-cols-3 lg:pt-[40vh]">
        <h2 className='col-span-2 py-8 text-2xl lg:text-4xl lg:col-span-3'>Recently Created Spaces</h2>
        <SpaceCard chain="ETHEREUM" tokenId="1" spaceTld=".ape" spaceName="APE COMMUNITY" spaceDesc="We ape-ing here. Wanna join?" spaceCover="" />
        <SpaceCard chain="OPTIMISM" tokenId="123" spaceTld=".xyz" spaceName="XYZ Innovators" spaceDesc="Exploring the unknown in the world of XYZ." />
        <SpaceCard chain="BASE" tokenId="102" spaceTld=".defi" spaceName="DEFI SPACE" spaceDesc="Community for DeFi related topics" spaceCover="" />
        <SpaceCard chain="BSC" tokenId="456" spaceTld=".crypto" spaceName="Crypto Enthusiasts" spaceDesc="Diving deep into the world of cryptocurrencies." />
        <SpaceCard chain="POLYGON" tokenId="102" spaceTld=".defi" spaceName="DEFI SPACE" spaceDesc="Community for DeFi related topics" spaceCover="" />
        <SpaceCard chain="AVAX" tokenId="789" spaceTld=".dream" spaceName="Dreamer's Hub" spaceDesc="Where dreams turn into reality, one project at a time." />

      </div>
      <div className='col-span-1 border-t-2 border-black lg:col-span-2 '>
        <div className="grid content-end w-full h-full grid-cols-2 gap-4 px-4 lg:px-8 lg:py-8 lg:grid-cols-6">
          <h2 className='col-span-2 py-8 text-2xl lg:text-4xl lg:col-span-6'>Top Blockchain Spaces</h2>
          <SpaceCard chain="PATEX" tokenId="101" spaceTld=".stars" spaceName="Stargazers Society" spaceDesc="Exploring the universe through technology and curiosity." />
          <SpaceCard chain="BNB" tokenId="303" spaceTld=".crypto" spaceName="CryptoPioneers" spaceDesc="For those leading the way in the world of crypto." />
          <SpaceCard chain="XDC" tokenId="202" spaceTld=".innovation" spaceName="Tech Innovation Hub" spaceDesc="Fostering innovation and creativity in the tech world." />
          <SpaceCard chain="TON" tokenId="42" spaceTld=".wander" spaceName="Wanderlust Dreamers" spaceDesc="Embark on global adventures and share travel stories." />
          <SpaceCard chain="ZORA" tokenId="123" spaceTld=".art" spaceName="Pixel Perfectionists" spaceDesc="Celebrating the beauty of digital art, one pixel at a time." />
          <SpaceCard chain="PEGO" tokenId="777" spaceTld=".fantasy" spaceName="Fantasy Realm Explorers" spaceDesc="Unveiling the magical mysteries of enchanting worlds." />
        </div>
      </div>
    </section >
  )
}

export default page