import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main
        className={`${inter.className}`}
      >
        <div className="z-10 items-center justify-between w-full font-mono text-base lg:flex">
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
          <footer className="fixed bottom-0 left-0 flex items-end justify-center w-full h-32 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="flex gap-2 p-5 pointer-events-auto place-items-center lg:p-0"
              href='https://www.zoociety.org'
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <span className='font-black' >Zoociety</span>
            </a>
          </footer>
        </div>

        <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:-translate-y-1/3 before:rounded-full before:bg-gradient-radial before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-fuchsia-300 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/50 after:dark:from-fuchsia-800 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <p className='flex max-w-2xl text-4xl font-bold text-center lg:text-5xl'>
            Create, connect and control your blockchain presence with namespace.
          </p>
          {/* <span>
              <Image src="/namespace-cube.svg" height={150} width={350} priority className='dark:hidden' />
              <Image src="/namespace-cube-wht.svg" height={150} width={350} priority className='hidden dark:flex' />
            </span> */}
        </div>

        <div className="z-50 grid w-full gap-2 p-2 mb-24 text-center border border-gray-500 rounded-xl lg:p-2 lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Link
            href="/registrar/name"
            className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
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

          <Link
            href="/registrar/space"
            className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

          >
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

          <Link
            href="/"
            className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

          >
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
          <Link
            href="/"
            className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Control name.space{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 w-full text-sm opacity-50`}>
              Take control of your web3 assets and identity. Manage your names, connect to spaces, share links, and store files with ease.
            </p>
          </Link>
        </div>
      </main>

    </>


  )
}
