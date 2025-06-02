import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='flex h-screen w-full' >
            <div className='flex-1 flex overflow-hidden w-full dark:bg-[#e7dadc55] bg-[#dfcfd3] relative justify-center items-center'>
                <img
                    src="/redis-logo.svg"
                    alt="redis-logo"
                    className="absolute left-0 top-0 w-full h-full object-cover opacity-25 pointer-events-none select-none -z-10"
                />
                <div className='flex flex-col gap-1 px-4 xl:ml-40 text-center md:text-start font-semibold z-10'>
                    <Image
                        src={"/logo.png"}
                        alt="logo"
                        width={599}
                        height={152}
                        className='mt-20 w-[420px] pointer-events-none select-none'
                    />
                    <p className='text-2xl md:text-3xl text-balance'>
                        The
                        <span className='bg-red-500 px-2 font-bold text-white'>ULTIMATE</span>
                        chat app
                    </p>
                    <p className='text-2xl md:text-3xl mb-32 text-balance'>
                        You
                        <span className='bg-green-500/90 font-bold px-2 text-white'>NEED TO</span>
                        have
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page