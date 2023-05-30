
import { Context } from '@/context';
import { cic, polygon } from '@/data/contracts';
import tokenAbi from "/data/contractABI/token.json";
import namespaceAbi from "/data/contractABI/namespace.json";
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { ethers } from 'ethers';

const controller = () => {
    const {
        account,
        network,
        setAllNames,
        setSpaceData,
        connectWallet,
        checkIfWalletIsConnected,
        setNamespace,
        namespace
    } = useContext(Context);

    const getNamespace = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                let namelink;
                if (network == "CIC Chain Mainnet") {
                    console.log("Fetching on : ", network);
                    const contract = new ethers.Contract(
                        cic.Namespace, // "contract addresss"
                        namespaceAbi,
                        signer
                    );
                    namelink = await contract.getNamespace(account);
                    setNamespace(namelink);
                } else if (network == "Polygon Mainnet") {
                    console.log("Fetching on ", network);
                    const contract = new ethers.Contract(
                        polygon.Namespace,
                        namespaceAbi,
                        signer
                    );
                    const primary = await contract.resolveAddress(account);
                    setNamespace(primary);
                    const spaces = await contract.getAllSpaces();
                    const names = await contract.getAllNames();
                    setAllNames(names);
                    setAllSpaces(spaces);
                    const spaceData = await Promise.all(
                        spaces.map(async (space) => {
                            const tld = space;
                            console.log("Space Found:", tld);
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
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUserStats = async () => {
        if (!account) {
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
                } else if (network === "Polygon Mainnet") {
                    const contract = new ethers.Contract(polygon.Tokenizer, tokenAbi, signer);
                    // const nameData = await Promise.all(
                    //   allNames.map(async (name) => {
                    //     const names = await contract.getNameSpaces(name);
                    //     return { names };
                    //   })
                    // );

                    // console.log("Name data:", nameData);
                    // setNameData(nameData);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!network) {
            checkIfWalletIsConnected();
        } else if (!account) {
            connectWallet();
        }
        getNamespace();
        getUserStats();
    }, [account, network]);

    return (
        <main className='items-start justify-start'>
            <div className="z-10 items-center justify-between w-full font-mono text-base lg:flex">
                <nav className="fixed top-0 left-0 flex justify-center w-full py-2 border-b border-gray-300 bg-gradient-to-b from-zinc-100 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-100 lg:p-2 lg:dark:bg-zinc-800/30">
                    <ul className='flex justify-between w-full'>
                        <li className='hover:bg-transparent'>
                            <Image src="/namespace-cube.svg" height={50} width={150} priority className='dark:hidden' />
                            <Image src="/namespace-cube-wht.svg" height={50} width={150} priority className='hidden dark:flex' />
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
            <div className='flex flex-col gap-5'>
                <p className='font-bold uppercase'>Collected Names</p>
                <div className="flex flex-wrap justify-between w-full gap-3 mb-24 overflow-x-scroll text-center rounded-xl lg:p-3 lg:mb-0 lg:text-left">
                    <Link href="/registrar/name" className="p-2 bg-gray-50 dark:bg-[#373737] h-[250px] border border-transparent transition-all rounded-2xl group border-gray-200 dark:border-gray-800 hover:-translate-y-1 hover:border-gray-300  hover:dark:bg-[#464646] hover:dark:border-neutral-700 hover:dark:bg-neutral-800/50">
                        <div className='grid h-[200px] min-w-[200px] content-between p-2 bg-gray-200 dark:bg-[#252525] rounded-xl group-hover:bg-gradient-to-b from-transparent to-[#1d1d1d55]'>
                            <h2 className={`mb-3 uppercase font-semibold flex justify-between`}>
                                POLYGON
                                <span>(001)</span>
                            </h2>
                            <p className={`m-0 w-full text-center font-bold text-2xl`}>
                                rald
                            </p>
                            <p className={`m-0 w-full text-sm text-center`}>
                                0 space/s
                            </p>
                        </div>
                    </Link>
                    <Link href="/registrar/name" className="p-2 bg-gray-50 dark:bg-[#373737] h-[250px] border border-transparent transition-all rounded-2xl group border-gray-200 dark:border-gray-800 hover:-translate-y-1 hover:border-gray-300  hover:dark:bg-[#464646] hover:dark:border-neutral-700 hover:dark:bg-neutral-800/50">
                        <div className='grid h-[200px] min-w-[200px] content-between p-2 bg-gray-200 dark:bg-[#252525] rounded-xl group-hover:bg-gradient-to-b from-transparent to-[#1d1d1d55]'>
                            <h2 className={`mb-3 uppercase font-semibold flex justify-between`}>
                                POLYGON
                                <span>(001)</span>
                            </h2>
                            <p className={`m-0 w-full text-center font-bold text-2xl`}>
                                rald
                            </p>
                            <p className={`m-0 w-full text-sm text-center`}>
                                0 space/s
                            </p>
                        </div>
                    </Link>
                    <Link href="/registrar/name" className="p-2 bg-gray-50 dark:bg-[#373737] h-[250px] border border-transparent transition-all rounded-2xl group border-gray-200 dark:border-gray-800 hover:-translate-y-1 hover:border-gray-300  hover:dark:bg-[#464646] hover:dark:border-neutral-700 hover:dark:bg-neutral-800/50">
                        <div className='grid h-[200px] min-w-[200px] content-between p-2 bg-gray-200 dark:bg-[#252525] rounded-xl group-hover:bg-gradient-to-b from-transparent to-[#1d1d1d55]'>
                            <h2 className={`mb-3 uppercase font-semibold flex justify-between`}>
                                POLYGON
                                <span>(001)</span>
                            </h2>
                            <p className={`m-0 w-full text-center font-bold text-2xl`}>
                                rald
                            </p>
                            <p className={`m-0 w-full text-sm text-center`}>
                                0 space/s
                            </p>
                        </div>
                    </Link>
                    <Link href="/registrar/name" className="p-2 bg-gray-50 dark:bg-[#373737] h-[250px] border border-transparent transition-all rounded-2xl group border-gray-200 dark:border-gray-800 hover:-translate-y-1 hover:border-gray-300  hover:dark:bg-[#464646] hover:dark:border-neutral-700 hover:dark:bg-neutral-800/50">
                        <div className='grid h-[200px] min-w-[200px] content-between p-2 bg-gray-200 dark:bg-[#252525] rounded-xl group-hover:bg-gradient-to-b from-transparent to-[#1d1d1d55]'>
                            <h2 className={`mb-3 uppercase font-semibold flex justify-between`}>
                                POLYGON
                                <span>(001)</span>
                            </h2>
                            <p className={`m-0 w-full text-center font-bold text-2xl`}>
                                rald
                            </p>
                            <p className={`m-0 w-full text-sm text-center`}>
                                0 space/s
                            </p>
                        </div>
                    </Link>


                    <Link href="/" className="p-3 col-span-1 h-[200px] min-w-[200px] transition-all flex justify-center items-center border hover:border-gray-400 rounded-lg group hover:backdrop-blur-2xl hover:scale-95 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                        <h2 className={`mb-3 uppercase font-bold flex flex-col items-center justify-between`}>
                            <span className='text-5xl'>+</span>
                            Create Names
                        </h2>
                    </Link>
                </div>
            </div>
            <div className='flex'>
                <p className='font-bold uppercase'>Collected Spaces</p>
            </div>

            {/* <Typing /> */}
        </main>
    )
}

export default controller