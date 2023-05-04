import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const browser = () => {
    return (
        <main
            className=""
        >


            <div className="relative gap-2 w-full h-full flex place-items-start before:absolute before:h-[300px] before:w-[480px] ">
                <nav className="fixed left-0 top-0 flex w-full px-4 py-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-100 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-100 lg:p-2 lg:dark:bg-zinc-800/30">
                    <ul className='flex w-full justify-center'>
                        <li>
                            <Link href="/">home</Link>
                        </li>
                        <li>
                            <Link href="/ns/file">nsFile</Link>
                        </li>
                        <li>
                            <Link href="/ns/link">nsLink</Link>
                        </li>
                    </ul>
                </nav>
                <div className='flex pl-3 rounded-xl p-[3px] gap-3  border-gray-300 border w-full '>
                    <Image src="/nscube.svg" height={10} width={20} priority className='dark:hidden' />
                    <Image src="/nscube-wht.svg" height={10} width={20} priority className='hidden dark:flex' />
                    <input className='lg:text-2xl rounded-xl  w-full bg-gray-200 text-xl z-50 font-bold bg-transparent px-3 py-1' placeholder='ns:chain/' />
                </div>
            </div>

            <div className="mb-24 p-2 rounded-xl w-full lg:p-2 border border-gray-300 gap-2 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                <Link
                    href="/ns/file"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                >
                    <h2 className={`mb-3 text-lg lg:text-2xl font-semibold`}>
                        Retrieve files
                    </h2>
                    <p className={`m-0 w-full text-sm opacity-50`}>

                    </p>
                </Link>

                <Link
                    href="/ns/link"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

                >
                    <h2 className={`mb-3 text-lg lg:text-2xl font-semibold`}>
                        View shorten links
                    </h2>
                    <p className={`m-0 w-full text-sm opacity-50`}>

                    </p>
                </Link>
                <Link
                    href="/ns/profile"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

                >
                    <h2 className={`mb-3 text-lg lg:text-2xl font-semibold`}>
                        View profile
                    </h2>
                    <p className={`m-0 w-full text-sm opacity-50`}>

                    </p>
                </Link>
                <Link
                    href="/ns/inft"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
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