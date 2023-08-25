import React from 'react'

const NameCard = ({ chain, spaceTld, name}) => {
    return (
        <div
            className="gap-1 hover:shadow-md cursor-pointer lg:gap-4 content-between grid p-2 lg:p-4 aspect-square bg-dark min-h-[20vh] w-full group rounded-md"
        >
            <p className="flex justify-between text-sm font-bold text-white">
                {chain}
            </p>
            <p className="text-base duration-100 lg:text-lg accent space group-hover:text-white">
                {spaceTld}
                <span className="inline-block pl-2 transition-transform accent group-hover:translate-x-1 motion-reduce:transform-none">
                    &gt;
                </span>
            </p>
            <div className='hidden overflow-x-scroll duration-100 group-hover:grid'>
                <p className='text-sm lg:text-base group-hover:accent'>{spaceName}</p>
                <p className='text-xs '>{spaceDesc}</p>
            </div>
        </div>
    )
}

export default NameCard