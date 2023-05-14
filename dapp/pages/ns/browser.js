import Typing from '@/components/Typing'
import TypingText from '@/components/TypingText'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const browser = () => {
    const data = ["name is a wallet address replacement", ".space is a community or brand identity", "ns:polygon/name is a web3 profile", "ns:polygon/name.space is community space and identity", "jobresume.name.space is a shorten link", "ns:polygon/name.space/book/nftmanual.pdf is a pdf file"]
    return (
        <main>
            <div className="relative gap-2 w-full h-full flex place-items-start before:absolute before:h-[300px] before:w-[480px] ">
                <nav className="fixed top-0 left-0 flex justify-center w-full px-4 py-2 border-b border-gray-300 bg-gradient-to-b from-zinc-100 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-100 lg:p-2 lg:dark:bg-zinc-800/30">
                    <ul className='flex justify-center w-full'>
                        <li>
                            <Link href="/">home</Link>
                        </li>
                        <li>
                            <Link href="https://nsdoc.zoociety.org/" target='_blank'>nsDoc</Link>
                        </li>
                    </ul>
                </nav>
                <div className='flex pl-3 rounded-xl p-[3px] gap-3  border-gray-300 border w-full '>
                    <Image src="/nscube.svg" height={10} width={20} priority className='dark:hidden' />
                    <Image src="/nscube-wht.svg" height={10} width={20} priority className='hidden dark:flex' />
                    <input className='z-50 w-full px-3 py-1 text-xl font-bold bg-transparent bg-gray-200 lg:text-2xl rounded-xl' placeholder='ns:chain/' />
                </div>
            </div>
            <div className="relative flex gap-5 flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:-translate-y-1/4 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[280px] after:w-[340px] after:translate-x-1/3 after:-translate-y-1/2 after:bg-gradient-conic after:from-fuchsia-300 after:via-blue-500 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/60 after:dark:from-fuchsia-700 after:dark:via-[#057aff]/40 before:lg:h-[360px]">
                <p className='text-2xl font-bold lg:text-3xl'>ns:chain/link.name.space/folder/filename.extension</p>
                <Typing data={data} />
            </div>

            <div className="z-50 grid w-full gap-2 p-2 mb-24 text-center border border-gray-300 rounded-xl lg:p-2 lg:mb-0 lg:grid-cols-4 lg:text-left">
                <Link
                    href="/ns/file"
                    className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                >
                    <h2 className={`mb-3 text-lg lg:text-2xl font-semibold`}>
                        Retrieve files
                    </h2>
                    <p className={`m-0 w-full text-sm opacity-50`}>

                    </p>
                </Link>

                <Link
                    href="/ns/link"
                    className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

                >
                    <h2 className={`mb-3 text-lg lg:text-2xl font-semibold`}>
                        View shorten links
                    </h2>
                    <p className={`m-0 w-full text-sm opacity-50`}>

                    </p>
                </Link>
                <Link
                    href="/ns/profile"
                    className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

                >
                    <h2 className={`mb-3 text-lg lg:text-2xl font-semibold`}>
                        View profile
                    </h2>
                    <p className={`m-0 w-full text-sm opacity-50`}>

                    </p>
                </Link>
                <Link
                    href="/ns/inft"
                    className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                >
                    <h2 className={`mb-3 text-lg lg:text-2xl font-semibold`}>
                        Browse interactiveNFT
                    </h2>
                    <p className={`m-0 w-full text-sm opacity-50`}>
                        {/* Create tokenized site, forms, games, documents, books, or portfolio in a form of interactiveNFT and browse it straight to nsBrowser. */}
                    </p>
                </Link>
            </div>
        </main>
    )
}

export default browser