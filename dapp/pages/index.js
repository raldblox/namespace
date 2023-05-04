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
        <div className="z-10 w-full items-center justify-between font-mono text-base lg:flex">
          <nav className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-100 py-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-100 lg:p-2 lg:dark:bg-zinc-800/30">
            <ul className='flex w-full justify-center'>
              <li className='hover:bg-transparent'>
                <Image src="/namespace-cube.svg" height={50} width={150} priority />
              </li>
              <li>
                <Link href="/ns/browser">nsBrowser</Link>
              </li>
              <li>
                <Link href="/">nsFile</Link>
              </li>
              <li>
                <Link href="/">nsLink</Link>
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
          <p className='lg:text-5xl text-4xl font-bold'><a className='z-50 text-transparent cursor-pointer' href='/admin'>_</a>namespaces</p>
        </div>

        <div className="mb-24 p-2 rounded-xl w-full lg:p-2 border border-gray-300 gap-2 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Link
            href="/registrar/name"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Create name{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 w-full text-sm opacity-50`}>
              Create a unique name on the blockchain to cement your place on web3 and start connecting to spaces you like.
            </p>
          </Link>

          <Link
            href="/registrar/space"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Create space{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 w-full text-sm opacity-50`}>
              Create web3 space identity for community, company or organization on the blockchain of your choice.
            </p>
          </Link>

          <Link
            href="/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

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
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              My Dashboard{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 w-full text-sm opacity-50`}>
              Take control of your web3 assets and identity. Manage your names, spaces, links, and files with ease.
            </p>
          </Link>
        </div>
      </main>

    </>


  )
}
