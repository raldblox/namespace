import Link from "next/link";
import React from "react";
import Typing from "../effects/Typing";

const Landing = () => {
  return (
    <>
      <section className="p-4 border-b-2 border-black lg:p-8">
        <div className="grid min-h-[110vh] grid-cols-2 gap-8 py-8 lg:grid-cols-4">
          <div className="flex flex-col col-span-2 space-y-5">
            <a
              href="https://dorahacks.io/aptos/round-3/buidl"
              target="_blank"
              className="inline-flex items-center p-1 pr-6 text-xs duration-150 border rounded-full lg:text-sm group w-fit gap-x-6 hover:bg-accent"
            >
              <span className="inline-block px-3 py-1 bg-white border border-black rounded-full">
                Latest News
              </span>
              <p className="flex items-center">
                AptosDAO Grantees
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </p>
            </a>
            <h1 className="max-w-2xl">
              Unlock boundless possibilities of <br /><Typing toRotate={["blockchain names", "blockchain spaces", "storage networks", "community identity", "holistic profile", "names services"]} />
            </h1>
            <p className="text-lg">
              One Name, Multiple Spaces, Infinite Possibilities
            </p>
            <div className="flex items-center gap-x-4">
              <a
                href="#start"
                className="px-4 py-4 text-sm border border-transparent lg:px-6 bg-accent group rounded-xl hover:border-black gap-x-1 hover:bg-transparent"
              >
                Get Started
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </a>
              <a
                href="javascript:void(0)"
                className="px-4 py-4 text-sm bg-transparent border border-transparent lg:px-6 rounded-xl hover:border-black gap-x-1 hover:bg-transparent"
              >
                Explore Domain Names
              </a>
            </div>
          </div>
          <div className="grid content-end w-full h-full grid-cols-2 col-span-2 gap-4 ">
            <Link
              href="/names"
              className="lg:max-w-[30vw] gap-4 grid p-4 px-6 bg-dark min-h-[20vh] rounded-2xl w-full group"
            >
              <h2 className="font-bold text-white space">BLOCKCHAIN NAMES</h2>
              <p className="text-gray-400 max-w-[75%] text-sm">
                Cement your place on web3 and start exploring new blockchain experiences with namespace.
              </p>
              <a className="pt-2 uppercase accent space group-hover:text-white">
                Claim unique names
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </a>
            </Link>
            <Link
              href="/spaces"
              className="lg:max-w-[30vw] gap-4 grid p-4 px-6 bg-dark min-h-[20vh] rounded-2xl w-full group"
            >
              <h2 className="font-bold text-white space">BLOCKCHAIN SPACES</h2>
              <p className="text-gray-400 max-w-[75%] text-sm">
                Own your distinct community identities on the blockchain of your
                choice.
              </p>
              <a className="pt-2 uppercase accent space group-hover:text-white">
                Go To Space Factory
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </a>
            </Link>
            <Link
              href="records"
              className="lg:max-w-[30vw] gap-4 grid p-4 px-6 bg-dark min-h-[20vh] rounded-2xl w-full group"
            >
              <h2 className="font-bold text-white space">NAMESPACE LINKS</h2>
              <p className="text-gray-400 max-w-[75%] text-sm">
                Securely store your contents on decentralized networks and access them faster with namespace.
              </p>
              <a className="pt-2 uppercase accent space group-hover:text-white">
                Go To Namespace Link
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </a>
            </Link>
            <Link
              href="profile"
              className="lg:max-w-[30vw] gap-4 grid p-4 px-6 bg-dark min-h-[20vh] rounded-2xl w-full group"
            >
              <h2 className="font-bold text-white space">NAMESPACE PROFILE</h2>
              <p className="text-gray-400 max-w-[80%] text-sm">
                Showcase your personalized identity, curated contents, and achievements in one interactive profile.
              </p>
              <a className="pt-2 uppercase accent space group-hover:text-white">
                VISIT MY PROFILE
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  &gt;
                </span>
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section className="p-4 border-b-2 border-black lg:p-4">
        <div className="flex flex-col justify-between grid-cols-4 gap-8 px-4 py-8 lg:grid">
          <h3 className="col-span-1 text-lg text-center lg:text-left">
            Supported by industry experts from the world's leading blockchain
            networks.
          </h3>
          <div
            className="flex flex-wrap items-center justify-center col-span-3 gap-4 lg:justify-between lg:ml-16 brand"
            id="start"
          >
            <h2>IBM</h2>
            <h2>Aptos</h2>
            <h2>Polygon</h2>
            <h2>Zetachain</h2>
            <h2>Filecoin</h2>
            <h2>Ethereum</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
