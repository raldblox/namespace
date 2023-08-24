import NsCard from '@/components/NsCard'
import Typing from '@/components/effects/Typing'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className='grid items-start justify-start min-h-[90vh] grid-cols-1 lg:grid-cols-2 gap-8 py-4 lg:py-8'>
      <div className='grid col-span-1 gap-8 px-4 lg:px-8 lg:py-8'>
        <a
          href="https://dorahacks.io/aptos/round-3/buidl"
          target="_blank"
          className="inline-flex items-center p-1 pr-6 text-xs duration-150 border rounded-full lg:text-sm group w-fit gap-x-6 hover:bg-accent"
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
        <h1 className='text-left'>Create Blockchain Space for your <br /> {" "}
          <span className='px-2 text-3xl uppercase scale-75 rounded-md shadow-md lg:text-5xl space bg-accent'>
            <Typing toRotate={["community", "brand", "project", "event", "application", "organization", "networks", "family"]} />
          </span>
        </h1>
        <div className="flex gap-4 w-fit">
          <input
            disabled={true}
            placeholder="Register Blockchain Space"
            className="w-full px-4 py-2 bg-gray-200"
          />
          <button className="p-4 uppercase bg-accent rounded-2xl focus:shadow-none">
            Register
          </button>
        </div>
      </div>
      <div className="grid px-4 lg:px-8 content-end w-full h-full grid-cols-2 col-span-1 py-8 gap-4 lg:grid-cols-3 lg:pt-[40vh]">
        <h2 className='col-span-2 py-8 text-2xl lg:text-4xl lg:col-span-3'>Recently Created Spaces</h2>
        <NsCard chain="ETHEREUM" tokenId="1" spaceTld=".ape" spaceName="APE COMMUNITY" spaceDesc="We ape-ing here. Wanna join?" spaceCover="" />
        <NsCard chain="OPTIMISM" tokenId="123" spaceTld=".xyz" spaceName="XYZ Innovators" spaceDesc="Exploring the unknown in the world of XYZ." />
        <NsCard chain="BASE" tokenId="102" spaceTld=".defi" spaceName="DEFI SPACE" spaceDesc="Community for DeFi related topics" spaceCover="" />
        <NsCard chain="BSC" tokenId="456" spaceTld=".crypto" spaceName="Crypto Enthusiasts" spaceDesc="Diving deep into the world of cryptocurrencies." />
        <NsCard chain="BASE" tokenId="102" spaceTld=".defi" spaceName="DEFI SPACE" spaceDesc="Community for DeFi related topics" spaceCover="" />
        <NsCard chain="AVAX" tokenId="789" spaceTld=".dream" spaceName="Dreamer's Hub" spaceDesc="Where dreams turn into reality, one project at a time." />

      </div>
      <div className='col-span-1 border-t-2 border-black lg:col-span-2 '>
        <div className="grid content-end w-full h-full grid-cols-2 gap-4 px-4 lg:px-8 lg:py-8 lg:grid-cols-6">
          <h2 className='col-span-2 py-8 text-2xl lg:text-4xl lg:col-span-6'>Top Blockchain Spaces</h2>
          <NsCard chain="PATEX" tokenId="101" spaceTld=".stars" spaceName="Stargazers Society" spaceDesc="Exploring the universe through technology and curiosity." />
          <NsCard chain="BNB" tokenId="303" spaceTld=".crypto" spaceName="CryptoPioneers" spaceDesc="For those leading the way in the world of crypto." />
          <NsCard chain="XDC" tokenId="202" spaceTld=".innovation" spaceName="Tech Innovation Hub" spaceDesc="Fostering innovation and creativity in the tech world." />
          <NsCard chain="EARTH" tokenId="42" spaceTld=".wander" spaceName="Wanderlust Dreamers" spaceDesc="Embark on global adventures and share travel stories." />
          <NsCard chain="PIXEL" tokenId="123" spaceTld=".art" spaceName="Pixel Perfectionists" spaceDesc="Celebrating the beauty of digital art, one pixel at a time." />
          <NsCard chain="DREAM" tokenId="777" spaceTld=".fantasy" spaceName="Fantasy Realm Explorers" spaceDesc="Unveiling the magical mysteries of enchanting worlds." />
        </div>
      </div>

    </section>
  )
}

export default page