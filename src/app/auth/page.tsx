import Image from 'next/image'
import React from 'react'
import AuthButtons from './AuthButtons'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

const page = async () => {

    const { isAuthenticated } = getKindeServerSession();
    if (await isAuthenticated()) { return redirect("/") }

    return (
        <div className='flex h-screen w-full' >
            <div className='flex-1 flex overflow-hidden w-full dark:bg-[#e7dadc55] bg-[#dfcfd3] relative justify-center items-center'>
                <div className='flex flex-col gap-1 px-4 text-center md:text-start font-semibold z-10'>
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
                    <p className='text-2xl md:text-3xl mb-10 text-balance'>
                        You
                        <span className='bg-green-500/90 font-bold px-2 text-white'>NEED TO</span>
                        have
                    </p>
                    <AuthButtons />
                </div>
            </div>
        </div>
    )
}

export default page