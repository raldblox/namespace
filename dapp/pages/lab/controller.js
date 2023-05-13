import TypingText from '@/components/TypingText'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const controller = () => {
    return (
        <main className='items-start justify-start'>
            <nav className="fixed top-0 left-0 flex justify-center w-full py-2 border-b border-gray-300 bg-gradient-to-b from-zinc-100 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-100 lg:p-2 lg:dark:bg-zinc-800/30">
                <ul className='flex justify-between w-full'>
                    <li className='hover:bg-transparent'>
                        <Image src="/namespace-cube.svg" height={50} width={150} priority className='dark:hidden' />
                        <Image src="/namespace-cube-wht.svg" height={50} width={150} priority className='hidden dark:flex' />
                    </li>
                    <li>
                        <Link href="/ns/browser">nsBrowser</Link>
                    </li>
                </ul>
            </nav>
            <div className='flex flex-col gap-5'>
                <p className='text-2xl font-bold'>Collected Names</p>
                <div className="grid w-full gap-2 p-2 mb-24 text-center border border-gray-500 rounded-xl lg:p-2 lg:mb-0 lg:grid-cols-6 lg:text-left">
                    <Link href="/registrar/name" className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            Create name{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 w-full text-sm opacity-50`}>
                            Create a unique name on the blockchain to cement your place on web3 and start connecting to spaces you like!
                        </p>
                    </Link>

                    <Link href="/registrar/space" className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" >
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            Create space{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 w-full text-sm opacity-50`}>
                            Create web3 space identity for your community, company or organization on the blockchain of your choice.
                        </p>
                    </Link>

                    <Link href="/" className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            Marketplace{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 w-full text-sm opacity-50`}>
                            Acquire premium names and spaces or sell one of yours in a safe and decentralized open marketplace.
                        </p>
                    </Link>
                    <Link href="/" className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" >
                        <h2 className={`mb-3 text-xl flex justify-between font-semibold`}>
                            POLYGON
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                (001)
                            </span>
                        </h2>
                        <p className={`m-0 w-full text-sm opacity-50`}>
                            Take control of your web3 assets and identity. Manage your names, connect to spaces, share links, and store files with ease.
                        </p>
                    </Link>
                </div>
            </div>
            <div className='flex'>
                <p className='text-2xl font-bold'>Collected Spaces</p>
            </div>

            {/* <Typing /> */}
        </main>
    )
}

export default controller