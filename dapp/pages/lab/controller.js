
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const controller = () => {
    return (
        <main className='items-start justify-start'>
            <nav className="fixed top-0 left-0 flex justify-center w-full py-2 border-b border-gray-300 bg-gradient-to-b from-zinc-100 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-100 lg:p-2 lg:dark:bg-zinc-800/30">
                <ul className='flex justify-between w-full'>
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
            <div className='flex flex-col gap-5'>
                <p className='font-bold uppercase'>Collected Names</p>
                <div className="grid w-full gap-3 mb-24 overflow-x-scroll text-center rounded-xl lg:p-3 lg:mb-0 lg:grid-cols-6 lg:text-left">
                    <Link href="/registrar/name" className="p-2 col-span-1 bg-gray-50 dark:bg-[#373737] h-[250px] backdrop-blur-2xl  border border-transparent transition-all rounded-2xl group border-gray-200 dark:border-gray-800 hover:-translate-y-1 hover:border-gray-300  hover:dark:bg-[#464646] hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                        <div className='grid h-[200px] content-between p-2 bg-gray-200 dark:bg-[#252525] rounded-xl group-hover:bg-gradient-to-b from-transparent to-[#1d1d1d55]'>
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

                    <Link href="/" className="p-3 col-span-1 h-[250px] w-[220px] transition-all flex justify-center items-center border hover:border-gray-400 rounded-lg group hover:backdrop-blur-2xl hover:scale-95 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
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