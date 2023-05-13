import TypingText from '@/components/TypingText'
import React from 'react'

const controller = () => {
    return (
        <main className='items-center justify-left'>
            <div>
                <div className='flex max-w-2xl text-4xl font-bold text-center lg:text-5xl'>
                    <TypingText />
                </div>
            </div>
            <div>
                <div className='flex max-w-2xl text-4xl font-bold text-center lg:text-5xl'>
                    <TypingText />
                </div>
            </div>

            {/* <Typing /> */}
        </main>
    )
}

export default controller