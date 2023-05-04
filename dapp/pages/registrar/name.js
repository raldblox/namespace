import Link from 'next/link'
import React, { useState } from 'react'

const names = () => {
    const [name, setName] = useState("name");
    const [chain, setChain] = useState("chain");
    const [space, setSpace] = useState("space");
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkVAlidity = () => {
        setLoading(true);
        setTimeout(() => {
            setValid(true);
            setLoading(false);
        }, 3000);
    }

    return (
        <main>
            <div className="z-10 w-full items-center justify-between font-mono text-base lg:flex">
                <nav className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-100 py-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-100 lg:p-2 lg:dark:bg-zinc-800/30">
                    <ul className='flex justify-between gap-2 w-full'>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/ns/browser">nsBrowser</Link>
                        </li>
                        <li>
                            <Link href="/">nsProfile</Link>
                        </li>
                    </ul>
                </nav>
                <footer className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <p
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{' '}
                        <span className=' font-black'>Zoociety</span>
                    </p>
                </footer>
            </div>

            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-fuchsia-300 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
                <p className='lg:text-5xl text-3xl font-bold'><span className='animate-pulse'>{name}</span>{space != "none" && <>.{space}</>}</p>
            </div>

            <div className="mb-24 p-2 rounded-xl w-full lg:p-2 border border-gray-300 gap-2 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        1. Choose Network
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">

                        </span>
                    </h2>
                    <div className={`m-0 w-full grid text-sm gap-2`}>
                        <select
                            disabled={name != "name"}
                            id="badge-class"
                            value={chain}
                            onChange={(e) => setChain(e.target.value)}
                            className="w-full py-2 px-4"
                        >
                            <option value="">--Select Blockchain Network--</option>
                            <option value="ethereum">Ethereum</option>
                            <option value="cic">CIC Chain Mainnet</option>
                            <option value="mumbai" >Polygon Mumbai</option>
                            <option value="polygon" >Polygon Mainnet</option>
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
                </div>

                <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        2. Create Name
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">

                        </span>
                    </h2>
                    <input
                        disabled={chain == ("chain" || "") || valid}
                        onChange={(e) => setName((e.target.value))}
                        className='z-50 py-2 px-4 font-bold text-left border bg-white w-full' placeholder='insert name'
                    />
                    {!valid ?
                        chain != "chain" && name != "name" && <button disabled={!name} className='z-50 py-2 mt-2 px-4 font-bold text-left border bg-white w-full' onClick={checkVAlidity}>
                            {loading ? "Checking" : "Check"} Name Availability
                        </button> :
                        <p className={`m-0 mt-2 w-full text-sm opacity-50`}>
                            <span className='font-bold'>{name}</span> is valid and available.
                        </p>
                    }
                </div>
                <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        3. Connect Space
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">

                        </span>
                    </h2>
                    <select
                        disabled={!valid}
                        id="badge-class"
                        value={space}
                        onChange={(e) => setSpace(e.target.value)}
                        className="w-full py-2 px-4"
                    >
                        <option value="">--Select your space--</option>
                        <option value="web3">Web3 Space</option>
                        <option value="blox" >Blox Space</option>
                        <option value="badges" >Badgify Space</option>
                        <option value="zoo" >Zoociety Space</option>
                        <option value="none">I will join later.</option>
                    </select>
                    {valid && space != "none" && <p className='m-0 mt-2 w-full text-sm opacity-50'>{space == "space" && <>Give some space to <span className='font-bold'>{name}</span>. </>}You can manage and connect more spaces after your name is minted.</p>}
                </div>
                <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        4. Mint to Own it{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">

                        </span>
                    </h2>
                    {chain != "chain" && name != "name" && space != "space" && valid &&
                        <>
                            <button className='z-50 py-2 px-4 font-bold text-left border bg-white hover:bg-black hover:text-white  w-full'>
                                Mint for{' '}
                                {chain == "cic" && "1 $CIC"}
                                {chain == "polygon" && "1 $MATIC"}
                                {chain == "mumbai" && "0.1 $MATIC"}
                                {chain == "arbitrum" && "1 $ARB"}
                                {chain == "ethereum" && "0.01 $ETH"}
                            </button>
                            <p className={`m-0 mt-2 w-full text-sm opacity-50`}>
                                <span className='font-bold'>{name}{space != "none" && <>.{space}</>}</span> is now ready to be minted on {chain} blockchain network.
                            </p>
                        </>}
                </div>
            </div>
        </main>
    )
}

export default names