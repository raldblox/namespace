import React from 'react'

const NsCard = ({ chain, tokenId, spaceTld, spaceName, spaceDesc, spaceCover }) => {
    return (
        <div
            className="gap-1 lg:gap-4 content-between grid p-2 lg:p-4 aspect-square bg-dark min-h-[20vh] w-full group rounded-md"
        >
            <p className="flex justify-between text-sm font-bold text-white">
                {chain}
                <span className="text-gray-400 max-w-[75%] text-sm">
                    {tokenId}
                </span>
            </p>
            <p className="text-base lg:text-lg accent space group-hover:text-white">
                {spaceTld}
                <span className="inline-block pl-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    &gt;
                </span>
            </p>
            <div className='hidden group-hover:grid'>
                <p className='text-sm lg:text-base group-hover:accent'>{spaceName}</p>
                <p className='text-xs'>{spaceDesc}</p>
            </div>
        </div>
    )
}

export default NsCard