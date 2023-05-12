import { Context } from '@/context';
import React, { useContext } from 'react'

const SwitchNetwork = ({ chain }) => {
    const { account,
        switchPolygon,
        switchMumbai,
        network,
        switchArbitrum, connectWallet
    } = useContext(Context);
    return (
        <>
            {!account && <button
                className="z-50 w-full px-4 py-2 mt-2 font-bold text-left border hover:bg-black hover:text-white"
                onClick={connectWallet}
            >
                Connect Wallet
            </button>}
            {chain == "Polygon Mainnet" && network != "Polygon Mainnet" && <button
                className="z-50 w-full px-4 py-2 mt-2 font-bold text-left border hover:bg-black hover:text-white"
                onClick={switchPolygon}
            >
                Switch to Polygon
            </button>}
            {chain == "Polygon Mumbai" && network != "Polygon Mumbai" && <button
                className="z-50 w-full px-4 py-2 mt-2 font-bold text-left border hover:bg-black hover:text-white"
                onClick={switchMumbai}
            >
                Switch to Mumbai
            </button>}
            {chain == "Arbitrum One" && network != "Arbitrum One" && <button
                className="z-50 w-full px-4 py-2 mt-2 font-bold text-left border hover:bg-black hover:text-white"
                onClick={switchArbitrum}
            >
                Switch to Arbitrum One
            </button>}
        </>
    )
}

export default SwitchNetwork