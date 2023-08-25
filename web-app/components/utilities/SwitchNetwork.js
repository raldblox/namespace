"use client"

import { Context } from '@/app/layout';
import { ChainNetwork } from '@/libraries/Networks'
import { useContext } from 'react';
import { useState } from 'react';

const SwitchNetwork = () => {
    const { network, setNetwork } = useContext(Context);
    const [selectedNetwork, setSelectedNetwork] = useState('ethereum-mainnet');

    const handleNetworkChange = async (event) => {
        const newNetwork = event.target.value;
        console.log("New Network: ", newNetwork);
        setSelectedNetwork(newNetwork);

        const selectedChain = ChainNetwork[newNetwork];
        console.log("Selected Chain:", selectedChain.params)

        // Convert chainId to hexadecimal representation
        const chainId = ChainNetwork[newNetwork].params[0].chainId;
        console.log("ChainId:", chainId)
        const correctedChainId = "0x" + chainId.toString(16);
        console.log("Corrected ChainId:", correctedChainId)

        const correctedSelectedChain = {
            ...selectedChain.params[0],
            chainId: correctedChainId,
        };

        if (window.ethereum && correctedSelectedChain) {
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: correctedSelectedChain.chainId }],
                });
            } catch (error) {
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [correctedSelectedChain],
                        });
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log(error);
                }
            }
        } else {
            alert("MetaMask is not installed or selected network is not valid.");
        }

    };

    return (
        <div>
            <select className='p-2 px-4' value={selectedNetwork} onChange={handleNetworkChange}>
                {Object.keys(ChainNetwork).map((chain) => (
                    <option key={chain} value={chain}>
                        {ChainNetwork[chain].params[0].chainName}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SwitchNetwork