import React from 'react'

const NamespaceCard = ({ chain, tokenId, spaceTld, name }) => {
    return (
        <div
            className="gap-1 hover:shadow-md cursor-pointer lg:gap-4 content-between grid p-2 lg:p-4 aspect-square bg-dark min-h-[20vh] w-full group rounded-md"
        >
            <p className="flex justify-between text-sm font-bold text-white">
                {chain}
                <span className="text-gray-400 max-w-[75%] text-sm">
                    {tokenId}
                </span>
            </p>
            <p className="text-xs duration-100 lg:text-sm accent space group-hover:text-white">
                {name}.{spaceTld}
            </p>
        </div>
    )
}

export default NamespaceCard