import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const index = () => {
    return (
        <main >
            <div className="z-10 w-full items-center justify-between font-mono text-base lg:flex">
                <nav className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-100 py-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-100 lg:p-2 lg:dark:bg-zinc-800/30">
                    <ul className='flex w-full justify-between'>
                        <li className='hover:bg-transparent'>
                            <Link href="/">
                                <Image src="/namespace-cube.svg" height={50} width={150} priority className='dark:hidden' />
                                <Image src="/namespace-cube-wht.svg" height={50} width={150} priority className='hidden dark:flex' />
                            </Link>
                        </li>
                        <li>
                            <Link href="/ns/browser">nsBrowser</Link>
                        </li>
                    </ul>
                </nav>
                <footer className="fixed bottom-0 left-0 flex h-32 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className=" text-sm flex place-items-center gap-2 p-5 lg:p-0"
                        href='https://www.zoociety.xyz'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Made with ❤️ by{' '}
                        <span className='font-black' >ZoocietyLabs</span>
                    </a>
                </footer>
            </div>

            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-fuchsia-300 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-fuchsia-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
                {/* <p className='lg:text-5xl text-4xl font-bold'><a className='z-50 text-transparent cursor-pointer' href='/admin'></a>namespace</p> */}
                <Image src="/namespace-cube.svg" height={150} width={350} priority className='dark:hidden' />
                <Image src="/namespace-cube-wht.svg" height={150} width={350} priority className='hidden dark:flex' />
            </div>
            <p>COMING SOON</p>
        </main>
    )
}

export default index